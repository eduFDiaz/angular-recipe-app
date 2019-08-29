import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set recipes';
export const FETCH_RECIPES = '[Recipes] Fetch recipes';

export const ADD_RECIPE = '[Recipes] Add recipe';
export const DELETE_RECIPE = '[Recipes] Delete recipe';
export const UPDATE_RECIPE = '[Recipes] Update recipe';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: {recipe: Recipe, index: number}) {}
}
export type RecipeActions = SetRecipes | FetchRecipes
        | AddRecipe | DeleteRecipe | UpdateRecipe;
