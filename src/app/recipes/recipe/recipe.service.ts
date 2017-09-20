import { Injectable, EventEmitter } from '@angular/core';

import {Recipe} from '../recipe.model';

@Injectable()
export class RecipeService {
	private recipes: Recipe[] = [];

	public recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
		return this.recipes.slice()
	}



}
