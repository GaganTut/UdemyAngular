import { START_EDIT } from './../constants/index';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import { Subscription} from 'rxjs/Subscription';

import {Ingrediant} from '../shared/ingrediant.model';

import * as ShoppingListActions from '../store/shop/shopping-list.actions';
import * as ShoppingListReducer from '../store/shop/shopping-list.reducer';
import * as app from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	shoppingListState: Observable<{ingrediants: Ingrediant[]}>;
	private subscription: Subscription;

  constructor(
		private store: Store<app.AppState>
	) { }

  ngOnInit() {
		this.shoppingListState = this.store.select('shop');
	}

	onEditItem(index: number) {
		this.store.dispatch(new ShoppingListActions.StartEdit(index));
	}
}
