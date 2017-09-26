import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FeatureState, State } from './../../store/recipe/recipe.reducers';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import { AddRecipe } from '../../store/recipe/recipe.actions';
import {Recipe} from '../recipe.model';
import { Store } from '@ngrx/store';
import { UpdateRecipe } from './../../store/recipe/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode= false;
	recipeForm: FormGroup;

  constructor(
		private route: ActivatedRoute,
    private router: Router,
    private store: Store<FeatureState>
	) { }

  ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params ) => {
					this.id = +params['id'];
					this.editMode = params['id'] != null;
					this.initForm();
				}
			);
	}

	onSubmit() {
		// const newRecipe = new Recipe(
		// 	this.recipeForm.value['name'],
		// 	this.recipeForm.value['description'],
		// 	this.recipeForm.value['imagePath'],
		// 	this.recipeForm.value['ingrediants']
		// );
		if (this.editMode) {
			this.store.dispatch(
        new UpdateRecipe({
          index: this.id,
          updatedRecipe: this.recipeForm.value
        })
      );
		} else {
			this.store.dispatch(
        new AddRecipe(this.recipeForm.value)
      );
		}
		this.onCancel();
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}

	onAddIngrediant() {
		(<FormArray>this.recipeForm.get('ingrediants')).push(
			new FormGroup({
				'name': new FormControl(null, Validators.required),
				'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
			})
		);
	}

	onDeleteIngrediant(index: number) {
		(<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
	}

	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';
		const recipeIngrediants = new FormArray([]);

		if (this.editMode) {
      this.store.select('recipe')
        .take(1)
        .subscribe(
          (recipeState: State) => {
            const recipe = recipeState.recipes[this.id];
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingrediants']) {
              for (const ingrediant of recipe.ingrediants) {
                recipeIngrediants.push(
                  new FormGroup({
                    'name': new FormControl(ingrediant.name, Validators.required),
                    'amount': new FormControl(ingrediant.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                  })
                );
              }
            }
          }
        );
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'imagePath': new FormControl(recipeImagePath, Validators.required),
			'description': new FormControl(recipeDescription, Validators.required),
			'ingrediants': recipeIngrediants
		});
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
