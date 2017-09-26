import * as types from './../../constants/index';
import { Action } from '@ngrx/store';


export class SignUp implements Action {
	readonly type = types.SIGN_UP;
}

export class TrySignUp implements Action {
	readonly type = types.TRY_SIGN_UP;

	constructor(public payload: {username: string, password: string}) {}
}

export class SignIn implements Action {
	readonly type = types.SIGN_IN;
}

export class SignOut implements Action {
	readonly type = types.SIGN_OUT;
}

export class SetToken implements Action {
	readonly type = types.SET_TOKEN;

	constructor(public payload: string) {}
}

export type AuthActions =
	SignIn |
	SignOut |
	SignUp |
	SetToken;
