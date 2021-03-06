import * as ShoppingListActions from './shopping-list.actions';
import * as types from '../../constants';

import { Ingrediant } from './../../shared/ingrediant.model';

export interface State {
	ingrediants: Ingrediant[];
	editedIngrediant: Ingrediant;
	editedIndex: number;
}

const initialState: State = {
	ingrediants: [
		new Ingrediant('Apples', 5),
		new Ingrediant('Tomatoes', 10)
	],
	editedIngrediant: null,
	editedIndex: -1
};

export function ShoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
	switch (action.type) {
		case types.ADD_INGREDIANT:
			return {
				...state,
				ingrediants: [...state.ingrediants, action.payload]
			};

		case types.ADD_INGREDIANTS:
			return {
				...state,
				ingrediants: [...state.ingrediants, ...action.payload]
			};

    case types.UPDATE_INGREDIANT:
      return {
        ...state,
        ingrediants: state.ingrediants.map((ingredient, index) => index === state.editedIndex ? action.payload : ingredient),
        editedIngrediant: null,
        editedIndex: -1
      };

		case types.DELETE_INGREDIANT:
			return {
				...state,
				ingrediants: state.ingrediants.filter((ingred, index) => index !== state.editedIndex),
				editedIngrediant: null,
				editedIndex: -1
			};

		case types.START_EDIT:
			return {
				...state,
				editedIngrediant: {...state.ingrediants[action.payload]},
				editedIndex: action.payload
			};

		case types.STOP_EDIT:
			return {
				...state,
				editedIngrediant: null,
				editedIndex: -1
			};

		default:
		return state;
	}
}
