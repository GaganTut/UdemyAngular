import * as app from '../../store/app.reducers';
import * as auth from '../../store/auth/auth.reducer';

import { Component, OnInit } from '@angular/core';
import { FetchRecipes, StoreRecipes } from '../../store/recipe/recipe.actions';

import { Observable } from 'rxjs/Observable';
import { SignOut } from './../../store/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	authState: Observable<auth.State>;

	constructor(
		private store: Store<app.AppState>
	) {}

	ngOnInit() {
		this.authState = this.store.select('auth');
	}

	onSaveData() {
		this.store.dispatch(new StoreRecipes());
	}

	onFetchData() {
		this.store.dispatch(new FetchRecipes());
	}

	onLogout() {
		this.store.dispatch(new SignOut());
	}
}
