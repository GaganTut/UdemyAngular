import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FeatureState, State } from '../../store/recipe/recipe.reducers';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	recipeState: Observable<State>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<FeatureState>
	) {
	 }

  ngOnInit() {
		this.recipeState = this.store.select('recipe');
	}

	onNewRecipe() {
		this.router.navigate(['new'], {relativeTo: this.route});
	}
}
