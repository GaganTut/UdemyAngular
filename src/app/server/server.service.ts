import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/rx';

import { RecipeService } from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class ServerService {
	constructor(
		private http: Http,
		private recipeService: RecipeService,
		private authService: AuthService
	) { }

	storeData() {
		return this.http.put('https://ngularprac.firebaseio.com/recipes.json', this.recipeService.getRecipes());
	}

	fetchData() {
		const token = this.authService.getToken()
		return this.http.get('https://ngularprac.firebaseio.com/recipes.json?auth=' + token)
			.map(
				(res: Response) => {
					const recipes: Recipe[] = res.json();
					for (const recipe of recipes) {
						if (!recipe['ingrediants']) {
							recipe['ingrediants'] = [];
						}
					}
					return recipes;
				}
			)
			.subscribe(
				(recipes: Recipe[]) => {
					return this.recipeService.setRecipes(recipes);
				}
			);
	}
}
