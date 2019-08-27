import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import { RecipeService } from './../recipe.service';

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private store: Store<fromShoppingList.AppState>,
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
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddToShoppingList() {
      this.store.dispatch(
        new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    // The route was already /recipe/1 we add /edit to it and voila!
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'] );
  }
}
