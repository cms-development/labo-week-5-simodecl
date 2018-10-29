import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errors: string = null;
  private apiURL = 'http://localhost/oauth/token';
  constructor(
    private http: HttpClient
    ) {}

  public login(data): Observable<any> {
    return this.http.post(this.apiURL, data)
    .pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  public refreshLogin(): Observable<any> {
    const data = {
      refresh_token: localStorage.getItem('refresh_token'),
      client_id: '671c1a41-66db-48af-baac-1c81b0392dea',
      client_secret: 'secret',
      grant_type: 'refresh_token'
    };
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    return this.http.post(this.apiURL, formData)
    .pipe(
      tap(res => console.log(res)),
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ', errorResponse.error.message);
      this.errors = errorResponse.error.message;
    } else {
      console.error('Server side error: ', errorResponse);
      this.errors = errorResponse.error.message;
    }

    return throwError(this.errors);
  }

  getToken(): string {
    const token = localStorage.getItem('access_token');

    return token;
  }

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('access_token');

    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
