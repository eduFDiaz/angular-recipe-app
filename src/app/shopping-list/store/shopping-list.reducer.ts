import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Bread', 1),
    new Ingredient('Mayo', 2)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients.slice(0, action.payload),
                      ...state.ingredients.slice(action.payload + 1)]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
     const ingredient = state.ingredients[action.payload.index];
     const updatedIngredient = {
       ...ingredient,
       ...action.payload.ingredient
      };
     const updatedIngredients = [...state.ingredients];
     updatedIngredients[action.payload.index] = updatedIngredient;
     return {
       ...state,
       ingredients: updatedIngredients
    };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload]}
    };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
    };
    default:
      return state;
  }
}
