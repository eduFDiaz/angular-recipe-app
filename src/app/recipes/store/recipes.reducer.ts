import { Recipe } from '../recipe.model';

import * as RecipeActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipesReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return { ...state, recipes: [...action.payload] };
    case RecipeActions.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state, recipes: [...state.recipes.slice(0, action.payload),
                            ...state.recipes.slice(action.payload + 1)]
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.recipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };
    default:
      return state;
  }
}
