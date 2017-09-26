import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as types from '../../constants';

import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { FeatureState } from './recipe.reducers';
import { FetchRecipes } from './recipe.actions';
import { Injectable } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(types.FETCH_RECIPES)
    .switchMap(
      (action: FetchRecipes) => {
        return this.httpClient.get<Recipe[]>('https://ngularprac.firebaseio.com/recipes.json', {
          observe: 'body',
          responseType: 'json'
        });
      }
    )
    .map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingrediants']) {
            recipe['ingrediants'] = [];
          }
        }
        return {
          type: types.SET_RECIPES,
          payload: recipes
        };
      }
    );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(types.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipe'))
    .switchMap(
      ([action, state]) => {
        const req = new HttpRequest('PUT', 'https://ngularprac.firebaseio.com/recipes.json', state.recipes, {reportProgress: true});
        return this.httpClient.request(req);
      }
    );



  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<FeatureState>
  ) {}
}
