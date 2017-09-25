import { Ingrediant } from './../../shared/ingrediant.model';
import * as types from './../../constants/index';
import { Action } from '@ngrx/store';

export class AddIngrediant implements Action {
	readonly type = types.ADD_INGREDIANT;
	constructor(public payload: Ingrediant) {}
}

export class AddIngrediants implements Action {
	readonly type = types.ADD_INGREDIANTS;
	constructor(public payload: Ingrediant[]) {}
}

export class UpdateIngrediant implements Action {
	readonly type = types.UPDATE_INGREDIANT;
	constructor(public payload: Ingrediant) {}
}

export class DeleteIngrediant implements Action {
	readonly type = types.DELETE_INGREDIANT;
}

export class StartEdit implements Action {
	readonly type = types.START_EDIT;
	constructor(public payload: number) {}
}

export class StopEdit implements Action {
	readonly type = types.STOP_EDIT;
}

export type ShoppingListActions =
AddIngrediant |
AddIngrediants |
UpdateIngrediant |
DeleteIngrediant |
StartEdit |
StopEdit;
