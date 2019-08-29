import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as fromRecipes from '../recipes/store/recipes.actions';
// private store: Store<fromAppReducer.AppState>

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromAppReducer.AppState>) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-api-9afeb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://recipe-book-api-9afeb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
        tap(recipes => {
          this.store.dispatch(new fromRecipes.SetRecipes(recipes));
        })
      );
  }
}
