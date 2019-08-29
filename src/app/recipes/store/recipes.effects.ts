import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromRecipesActions from './recipes.actions';

@Injectable()
export class RecipesEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(fromRecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://recipe-book-api-9afeb.firebaseio.com/recipes.json'
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
      });
    }),
    map(recipes => {
      return new fromRecipesActions.SetRecipes(recipes);
    })
  );
}
