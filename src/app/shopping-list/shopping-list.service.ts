import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [];

  getIngredients() {
    // Don't wanna return a reference
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    // We didn't use a reference to ingredients
    // so we have to emit a signal when it changes
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
