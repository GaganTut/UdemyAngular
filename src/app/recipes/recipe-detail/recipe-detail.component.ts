import { Component, OnInit, Input} from '@angular/core';

import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	@Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
	}
	
	onAddToList() {
		this.recipeService.addIngToList(this.recipe.ingrediants);
	}

}
