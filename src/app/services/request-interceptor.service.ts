import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getToken();

    // Clone the request and set the new header in one step.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      tap(
        err => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
          }
        }
      )
    );
  }
}
