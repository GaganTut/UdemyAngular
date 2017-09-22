import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject';

import {Recipe} from './recipe.model';
import { Ingrediant } from './../shared/ingrediant.model';
import {ShoppingListService} from './../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();
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

	constructor(private shoppingService: ShoppingListService) {
	}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

  getRecipes() {
		return this.recipes.slice()
	}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	addIngToList(ingrediants: Ingrediant[]) {
		this.shoppingService.addIngrediants(ingrediants);
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}
}
