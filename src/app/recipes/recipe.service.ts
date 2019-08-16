import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Baked lamb Chops',
      'Exquisite baked lamb ribs',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new Ingredient('Lamb ribs', 3),
        new Ingredient('Mojito Sauce', 1),
      ]),
    new Recipe(
      'Roasted potatoes',
      'Delicious roasted potatoes slices',
      'https://thecozyapron.com/wp-content/uploads/2018/03/dijon-roasted-potatoes_thecozyapron_1.jpg',
      [
        new Ingredient('Potatoes', 3),
        new Ingredient('Salt', 1),
      ]),
    new Recipe(
      'Boiled eggs in Garlic',
      'Boiled eggs with salt and garlic',
      'https://live.staticflickr.com/7838/46602248784_1b5fcc443d_b.jpg',
      [
        new Ingredient('Eggs', 3),
        new Ingredient('Garlic', 1),
      ])
  ];

  getRecipes() {
    // Returns all the recipes, we used Slice returns
    // an exact copy of the array, not a reference
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // Returns one recipe, we used Slice returns
    // an exact copy of the array, not a reference
    return this.recipes[index];
  }
}
