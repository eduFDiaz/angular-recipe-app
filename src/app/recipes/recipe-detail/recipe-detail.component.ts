import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromRecipes from 'src/app/recipes/store/recipes.actions';
import * as fromAppReducer from 'src/app/store/app.reducer';

import { Recipe } from '../recipe.model';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private store: Store<fromAppReducer.AppState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // The + symbol is added to convert the string to a number
    // because we are using the subscribe function to watch for changes in params
    // angular will the clean up, although you need to implement the clean up
    // if you use your own Observables
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.store.select('recipes').pipe(
            map(recipeState => {
              return recipeState.recipes.find((recipe, index) => {
                return index === this.id;
              });
            })
          ).subscribe(recipe => {
            this.recipe = recipe;
          });
        });
  }

  onAddToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    // The route was already /recipe/1 we add /edit to it and voila!
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new fromRecipes.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
