import { Injectable, EventEmitter } from '@angular/core';

import {Recipe} from '../recipe.model';
import { Ingrediant } from '../../shared/ingrediant.model';

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

  getRecipes() {
		return this.recipes.slice()
	}



}
