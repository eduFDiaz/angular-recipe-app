import { RecipeService } from './../recipe.service';
import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // The + symbol is added to convert the string to a number
    // because we are using the suscribe function to watch for changes in params
    // angular will the clean up, althoug you need to implement the clean up
    // if you use your own Observables
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
    console.log(this.id, this.recipe);
  }
  onAddToShoppingList(event) {
    this.recipe.ingredients.slice().forEach(ingredient => {
      this.shoppingListService.addIngredient(ingredient);
    });
  }

  onEditRecipe(event) {
    // The route eas already /recipe/1 we add /edit to it and voila!
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
