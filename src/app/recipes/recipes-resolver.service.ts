import { RecipeActions, SetRecipes, SET_RECIPES } from './store/recipes.actions';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRecipeActions from 'src/app/recipes/store/recipes.actions';
import * as fromAppReducer from 'src/app/store/app.reducer';

import { Recipe } from './recipe.model';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<fromAppReducer.AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    this.store.dispatch(new fromRecipeActions.FetchRecipes());
    return this.actions$.pipe(ofType(fromRecipeActions.SET_RECIPES),
    take(1));
  }
}
