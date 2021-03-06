import { Injectable } from '@angular/core';
import { Article } from '../article';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articlesURL = 'http://localhost/jsonapi/node/article';

  constructor(
    private http: HttpClient,
    ) { }

  getArticles(): Observable<any> {
    return this.http.get<any>(this.articlesURL)
    .pipe(
      map( articles => {
          return articles.data;
      }),
      tap(articles => console.log(articles)),
      catchError(this.handleError('getArticles', []))
    );
  }

  getArticle(id: string): Observable<any> {
    const url = `${this.articlesURL}/${id}`;
    return this.http.get<any>(url)
    .pipe(
      map( article => {
        return article.data;
      }),
      tap(article => console.log(article)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  patchArticle(id: string, body: Object): Observable<Object> {
    const url = `${this.articlesURL}/${id}`;
    return this.http.patch<Object>(url, body)
    .pipe(
      tap(article => console.log('Article updated'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
