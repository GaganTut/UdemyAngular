import { Router } from '@angular/router';
import { TrySignUp, TrySignIn } from './auth.actions';
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

	@Effect()
	authSignIn = this.actions$
		.ofType(types.TRY_SIGN_IN)
		.map((action: TrySignIn) => {
			return action.payload;
		})
		.switchMap((authData: {username: string, password: string}) => {
			return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
		})
		.switchMap(() => {
			return fromPromise(firebase.auth().currentUser.getIdToken());
		})
		.mergeMap((token: string) => {
			this.router.navigate(['/']);
			return [
				{
					type: types.SIGN_IN
				},
				{
					type: types.SET_TOKEN,
					payload: token
				}
			];
		});

	@Effect()
		authLogout = this.actions$
			.ofType(types.SIGN_OUT)
			.do(() => {
				this.router.navigate(['/']);
			});


	constructor(
		private actions$: Actions,
		private router: Router
	) {}

}
