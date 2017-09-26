import { TrySignUp } from './../../store/auth/auth.actions';
import { AppState } from './../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

	constructor(
		private store: Store<AppState>
	) { }

	onSignup(form: NgForm) {
		const email = form.value.email;
		const password = form.value.password;
		this.store.dispatch(new TrySignUp({username: email, password}));
	}
}
