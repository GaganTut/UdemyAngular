import { Injectable, EventEmitter } from '@angular/core';

import {Recipe} from '../recipe.model';
import { Ingrediant } from '../../shared/ingrediant.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	private recipes: Recipe[] = [
		new Recipe(
			'First Service',
			'This is the first test recipe',
			'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
			[
				new Ingrediant('Meat', 1),
				new Ingrediant('Fries', 12)
			]
		)
	];

	public recipeSelected = new EventEmitter<Recipe>();

	constructor(private shoppingService: ShoppingListService) {

	}

  getRecipes() {
		return this.recipes.slice()
	}

	addIngToList(ingrediants: Ingrediant[]) {
		this.shoppingService.addIngrediants(ingrediants);
	}



}
