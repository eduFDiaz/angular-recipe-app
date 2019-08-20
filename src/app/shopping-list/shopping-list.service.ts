import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Bread', 1),
    new Ingredient('Mayo', 2)
  ];

  getIngredients() {
    // Don't wanna return a reference
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    // Don't wanna return a reference
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    // We didn't use a reference to ingredients
    // so we have to emit a signal when it changes
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    // We didn't use a reference to ingredients
    // so we have to emit a signal when it changes
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    // We didn't use a reference to ingredients
    // so we have to emit a signal when it changes
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
