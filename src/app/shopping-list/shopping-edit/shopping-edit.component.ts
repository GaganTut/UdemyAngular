import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {NgForm } from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {Ingrediant} from '../../shared/ingrediant.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	@ViewChild('f') shoppingForm: NgForm;
	subscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editedItem: Ingrediant;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
		this.shoppingService.startedEditing
			.subscribe(
				(index: number) => {
					this.editMode = true;
					this.editedItemIndex = index;
					this.editedItem = this.shoppingService.getIngrediant(index);
					this.shoppingForm.setValue({
						name: this.editedItem.name,
						amount: this.editedItem.amount
					})
				}
			)
	}

	ngOnDestroy() {
		if(this.subscription) this.subscription.unsubscribe();
	}
	
	onAddItem(form: NgForm) {
		const newIngrediant = new Ingrediant(form.value.name, form.value.amount);
		if (this.editMode) {
			this.shoppingService.updateIngrediant(this.editedItemIndex, newIngrediant);
		} else {
			this.shoppingService.addIngrediant(newIngrediant);
		}
		form.reset();
		this.editMode = false;
	}

	onClear() {
		this.shoppingForm.reset();
		this.editMode = false;
	}

	onDelete(index: number) {
		this.shoppingService.deleteIngrediant(index);
		this.onClear();
	}
}
