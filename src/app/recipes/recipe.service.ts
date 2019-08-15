import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Baked lamb Chops', 'Exquisite baked lamb ribs', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Roasted potatoes', 'Delicious roasted potatoes slices', 'https://thecozyapron.com/wp-content/uploads/2018/03/dijon-roasted-potatoes_thecozyapron_1.jpg'),
    new Recipe('Boiled eggs in Garlic', 'Boiled eggs with salt and garlic', 'https://live.staticflickr.com/7838/46602248784_1b5fcc443d_b.jpg')
  ];

  getRecipes() {
    // Slice returns an exact copy of the array, not a reference
    return this.recipes.slice();
  }
}
