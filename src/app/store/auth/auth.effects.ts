import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import * as firebase from 'firebase';
import * as types from './../../constants/index';

import { Actions, Effect } from '@ngrx/effects';
import { TrySignIn, TrySignUp } from './auth.actions';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/observable/fromPromise';

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
