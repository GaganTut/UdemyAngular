import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription} from 'rxjs/Subscription';

import {Ingrediant} from '../shared/ingrediant.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingrediants: Ingrediant[];
	private subscription: Subscription;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
		this.ingrediants = this.shoppingService.getIngrediants();
		this.subscription = this.shoppingService.ingrediantChanged
			.subscribe(
				(ingrediants: Ingrediant[]) => {
					this.ingrediants = ingrediants;
				}
			)
	}

	onEditItem(index: number) {
		this.shoppingService.startedEditing.next(index);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
