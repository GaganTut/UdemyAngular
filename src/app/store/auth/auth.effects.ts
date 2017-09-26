import { TrySignUp } from './auth.actions';
import * as types from './../../constants/index';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/Observable/fromPromise';

@Injectable()
export class AuthEffects {
	@Effect()
	authSignUp = this.actions$
		.ofType(types.TRY_SIGN_UP)
		.map((action: TrySignUp) => {
			return action.payload;
		})
		.switchMap((authData: {username: string, password: string}) => {
			return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
		})
		.switchMap(() => {
			return fromPromise(firebase.auth().currentUser.getIdToken());
		})
		.mergeMap((token: string) => {
			return [
				{
					type: types.SIGN_UP
				},
				{
					type: types.SET_TOKEN,
					payload: token
				}
			];
		});

	constructor(
		private actions$: Actions
	) {}

}
