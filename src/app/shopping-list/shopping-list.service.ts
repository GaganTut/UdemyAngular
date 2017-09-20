import { Injectable, EventEmitter } from '@angular/core';

import {Ingrediant} from '../shared/ingrediant.model';

@Injectable()
export class ShoppingListService {
	ingrediantChanged = new EventEmitter<Ingrediant[]>();
	private ingrediants: Ingrediant[] = [
		new Ingrediant('Apples', 5),
		new Ingrediant('Tomatoes', 10)
	];

	getIngrediants() {
		return this.ingrediants.slice();
	}

	addIngrediant(ingrediant: Ingrediant) {
		this.ingrediants.push(ingrediant);
		this.ingrediantChanged.emit(this.ingrediants.slice());
	}
}
