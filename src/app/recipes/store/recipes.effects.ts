import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromRecipesActions from './recipes.actions';
import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';

@Injectable()
export class RecipesEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromAppReducer.AppState>) { }

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

  @Effect({dispatch: false})
  SaveRecipes = this.actions$.pipe(
    ofType(fromRecipesActions.SAVE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put('https://recipe-book-api-9afeb.firebaseio.com/recipes.json', recipesState.recipes);
    })
  );
}
