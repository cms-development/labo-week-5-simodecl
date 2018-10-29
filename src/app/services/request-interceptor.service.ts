import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const token = this.auth.getToken();
    // Clone the request and set the new header in one step.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      tap(
        result => console.log(result),
        err => {
          if (err instanceof HttpErrorResponse) {
                console.log(err);
                return this.handleError(req, next);
            }
        }
      )
    );
  }
  handleError(req: HttpRequest<any>, next: HttpHandler) {
    this.auth.refreshLogin().subscribe(tokens => {
      console.log(tokens);
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      return next.handle(authReq);
    }, err => {
      localStorage.clear();
      return this.router.navigate(['dashboard']);
    });
  }
}
