import { Injectable } from '@angular/core';
import { Recipe } from '../recipe';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesURL = 'https://simodecl.cmsdevelopment.be/wp-json/wp/v2/recipe';

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesURL)
    .pipe(
      tap(recipes => console.log(recipes)),
      catchError(this.handleError('getRecipes', []))
    );
  }

  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesURL}/${id}?_embed`;
    return this.http.get<Recipe>(url)
    .pipe(
      tap(recipe => console.log(recipe)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RecipeService: ${message}`);
}
}
