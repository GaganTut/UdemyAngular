import { AppState } from './../store/app.reducers';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import * as auth from '../store/actions/auth.actions';

@Injectable()
export class AuthService {
	token: string;
	constructor(
		private router: Router,
		private store: Store<app.AppState>
	) {}

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(
				res => {
					this.store.dispatch(new auth.SignUp());
				}
			)
			.catch(
				error => console.log(error)
			);
	}
	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(
				res => {
					this.store.dispatch(new auth.SignIn());
					this.router.navigate(['/']);
					this.getToken();
				}
			);
	}
	getToken() {
		firebase.auth().currentUser.getToken()
			.then(
				(token: string) => (new auth.SetToken(token))
			);
		return this.token;
	}

	logout() {
		firebase.auth().signOut();
		this.token = null;
	}
}
