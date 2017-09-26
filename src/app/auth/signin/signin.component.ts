import { TrySignIn } from './../../store/auth/auth.actions';
import { AppState } from './../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
		private store: Store<AppState>
	) { }

  ngOnInit() {
	}

	onSignin(form: NgForm) {
		this.store.dispatch(new TrySignIn({username: form.value.email, password: form.value.password}));
	}
}
