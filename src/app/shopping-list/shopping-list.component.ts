import { Component, OnInit } from '@angular/core';

import {Ingrediant} from '../shared/ingrediant.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	ingrediants: Ingrediant[];

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
		this.ingrediants = this.shoppingService.getIngrediants();
		this.shoppingService.ingrediantChanged
			.subscribe(
				(ingrediants: Ingrediant[]) => {
					this.ingrediants = ingrediants;
				}
			)
	}
}
