import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
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
    this.http
    .get<Recipe[]>('https://recipe-book-api-9afeb.firebaseio.com/recipes.json')
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      }, error => {
        console.log(error);
      });
  }
}
