import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../../store/actions/shopping-list.actions';
import * as ShoppingListReducer from '../../store/reducers/shopping-list.reducer';
import * as app from '../../store/app.reducers';

import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	id: number;

	constructor(
		private recipeService: RecipeService,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<app.AppState>
	) { }

  ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = +params['id'];
					this.recipe = this.recipeService.getRecipe(this.id);
				}
			);
	}

	onAddToList() {
		this.store.dispatch(new ShoppingListActions.AddIngrediants(this.recipe.ingrediants));
	}

	onToEdit() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}
	onDelete() {
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['/recipes']);
	}

}
