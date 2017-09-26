import * as types from '../../constants';

import { Action } from '@ngrx/store';
import { Recipe } from './../../recipes/recipe.model';

export class SetRecipes implements Action {
	readonly type = types.SET_RECIPES;

	constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
	readonly type = types.ADD_RECIPE;

	constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
	readonly type = types.UPDATE_RECIPE;

	constructor(public payload: {index: number, updatedRecipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
	readonly type = types.DELETE_RECIPE;

	constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
	readonly type = types.STORE_RECIPES;
}

export class FetchRecipes implements Action {
	readonly type = types.FETCH_RECIPES;
}

export type RecipeActions =
	SetRecipes |
	AddRecipe |
	UpdateRecipe |
  DeleteRecipe |
  StoreRecipes |
  FetchRecipes;
