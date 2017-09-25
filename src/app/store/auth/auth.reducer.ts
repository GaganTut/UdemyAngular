import { SET_TOKEN } from './../../constants/index';
import { Ingrediant } from './../../shared/ingrediant.model';
import * as AuthActions from '../actions/auth.actions';
import * as types from '../../constants';

export interface State {
	token: string;
	authenticated: boolean;
}

export interface AppState {
	shoppingList: State;
}

const initialState: State = {
	token: null,
	authenticated: false
};

export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
	switch (action.type) {

		case types.SIGN_UP:
		case types.SIGN_IN:
			return {
				...state,
				authenticated: true
			};

		case types.SIGN_OUT:
			return {
				...state,
				token: null,
				authenticated: false
			};

		case types.SET_TOKEN:
			return {
				...state,
				token: null,
				authenticated: false
			};

		default:
		return state;
	}
}
