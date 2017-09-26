import * as app from '../store/app.reducers';

import { Component, OnInit } from '@angular/core';

import {Ingrediant} from '../shared/ingrediant.model';
import { Observable } from 'rxjs/Observable';
import { StartEdit } from './../store/shop/shopping-list.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	shoppingListState: Observable<{ingrediants: Ingrediant[]}>;

  constructor(
		private store: Store<app.AppState>
	) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shop');
	}

	onEditItem(index: number) {
		this.store.dispatch(new StartEdit(index));
	}
}
