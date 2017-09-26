import * as ShoppingListActions from '../../store/shop/shopping-list.actions';
import * as ShoppingListReducer from '../../store/shop/shopping-list.reducer';
import * as app from '../../store/app.reducers';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {Ingrediant} from '../../shared/ingrediant.model';
import {NgForm} from '@angular/forms';
import { Store } from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	@ViewChild('f') shoppingForm: NgForm;
	subscription: Subscription;
	editMode = false;
	editedItem: Ingrediant;

  constructor(
		private store: Store<app.AppState>
	) { }

  ngOnInit() {
		this.subscription = this.store.select('shop')
			.subscribe(
				data => {
					if (data.editedIndex > -1) {
						this.editedItem = data.editedIngrediant;
						this.editMode = true;
						this.shoppingForm.setValue({
							name: this.editedItem.name,
							amount: this.editedItem.amount
						});
					} else {
						this.editMode = false;
					}
				}
			);
	}

	ngOnDestroy() {
		this.store.dispatch(new ShoppingListActions.StopEdit());
		if (this.subscription) {this.subscription.unsubscribe(); }
	}

	onAddItem(form: NgForm) {
		const newIngrediant = new Ingrediant(form.value.name, form.value.amount);
		if (this.editMode) {
			this.store.dispatch(new ShoppingListActions.UpdateIngrediant(newIngrediant));
		} else {
			this.store.dispatch(new ShoppingListActions.AddIngrediant(newIngrediant));
		}
		form.reset();
		this.editMode = false;
	}

	onClear() {
		this.shoppingForm.reset();
		this.editMode = false;
	}

	onDelete(index: number) {
		this.store.dispatch(new ShoppingListActions.DeleteIngrediant());
		this.onClear();
	}
}
