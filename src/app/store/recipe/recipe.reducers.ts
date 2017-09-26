import * as types from './../../constants/index';

import { AppState } from './../auth/auth.reducer';
import { Ingrediant } from './../../shared/ingrediant.model';
import { Recipe } from './../../recipes/recipe.model';
import { RecipeActions } from './recipe.actions';

export interface FeatureState extends AppState {
	recipe: State;
}

export interface State {
	recipes: Recipe[];
}

const initialState: State = {
	recipes: [
		new Recipe(
			'First Service',
			'This is the first test recipe',
			'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
			[
				new Ingrediant('Meat', 1),
				new Ingrediant('Fries', 12)
			]
		),
		new Recipe(
			'Big Fat Burger',
			'This is a random description',
			'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
			[
				new Ingrediant('Buns', 3),
				new Ingrediant('Meat', 4)
			]
		)
	]
};

export function recipeReducer(state = initialState, action: RecipeActions) {
	switch (action.type) {
		case types.SET_RECIPES:
			return {
				...state,
				recipes: [...action.payload]
			};

		case types.ADD_RECIPE:
			return {
				...state,
				recipes: [...state.recipes, action.payload]
			};

		case types.UPDATE_RECIPE:
			const recipes = [...state.recipes];
			recipes[action.payload.index] = action.payload.updatedRecipe;
			return {
			...state,
			recipes: recipes
			};

    case types.DELETE_RECIPE:
			return {
				...state,
				recipes: [...state.recipes].splice(action.payload, 1)
			};

		default:
			return state;
	}
}
