import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [];

  getIngredients() {
    // Don't wanna return a reference
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    // We didn't use a reference to ingredients
    // so we have to emit a signal when it changes
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
