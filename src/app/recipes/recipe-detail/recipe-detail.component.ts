import 'rxjs/add/operator/take';

import * as ShoppingListActions from '../../store/shop/shopping-list.actions';
import * as ShoppingListReducer from '../../store/shop/shopping-list.reducer';

import {ActivatedRoute, Params, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FeatureState, State } from './../../store/recipe/recipe.reducers';

import { AddIngrediants } from './../../store/shop/shopping-list.actions';
import { DeleteRecipe } from './../../store/recipe/recipe.actions';
import { Observable } from 'rxjs/Observable';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipeState: Observable<State>;
	id: number;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<FeatureState>
	) { }

  ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = +params['id'];
					this.recipeState = this.store.select('recipe');
				}
			);
	}

	onAddToList() {
		this.store.select('recipe')
			.take(1)
			.subscribe(
				(recipeState: State) => {
					this.store.dispatch(new AddIngrediants(recipeState.recipes[this.id].ingrediants));
				}
			);
	}

	onToEdit() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}

	onDelete() {
    console.log(this.id);
		this.store.dispatch(new DeleteRecipe(this.id));
		this.router.navigate(['/recipes']);
	}
}
