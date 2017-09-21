import { Injectable, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Ingrediant} from '../shared/ingrediant.model';

@Injectable()
export class ShoppingListService {
	ingrediantChanged = new EventEmitter<Ingrediant[]>();
	startedEditing = new Subject<number>();
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

	addIngrediants(ingrediants: Ingrediant[]) {
		this.ingrediants.push(...ingrediants);
		this.ingrediantChanged.emit(this.ingrediants.slice());
	}

	getIngrediant(index: number) {
		return this.ingrediants[index];
	}

	updateIngrediant(index: number, newIngrediant: Ingrediant) {
		this.ingrediants[index] = newIngrediant;
		this.ingrediantChanged.next(this.ingrediants.slice());
	}

	deleteIngrediant(index: number) {
		this.ingrediants.splice(index, 1);
		this.ingrediantChanged.next(this.ingrediants.slice());
	}
}
