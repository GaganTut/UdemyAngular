import {ActionReducerMap} from '@ngrx/store';
import * as shop from './shop/shopping-list.reducer';
import * as auth from './auth/auth.reducer';

export interface AppState {
	shop: shop.State;
	auth: auth.State;
}

export const reducers: ActionReducerMap<AppState> = {
	shop: shop.ShoppingListReducer,
	auth: auth.AuthReducer
};
