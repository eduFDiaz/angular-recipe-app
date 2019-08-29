import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  /* getRecipes() {
    // Returns all the recipes, we used Slice returns
    // an exact copy of the array, not a reference
    return this.recipes.slice();
  } */

  /* getRecipe(index: number) {
    // Returns one recipe, we used Slice returns
    // an exact copy of the array, not a reference
    return this.recipes[index];
  } */

 /*  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(newRecipe: Recipe, index: number) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  } */

  /* setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  } */
}
