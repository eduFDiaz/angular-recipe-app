import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from './../recipe.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as fromRecipes from 'src/app/recipes/store/recipes.actions';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromAppReducer.AppState>) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          // Next we assign the value to editMode only if id exists
          // in the route, therefor edit method with id was passed
          // along edit as part of the route
          this.editMode = params.id != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    // This method initializes the form member
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
        this.subscription = this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      ).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe.ingredients) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, [Validators.required]),
                amount: new FormControl(
                  ingredient.amount,
                  [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]
                )
              })
            );
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    // This method adds or updates a recipe depending
    // on the value of editMode

    if (this.editMode) {
      // this.recipeService.updateRecipe(this.recipeForm.value, this.id);
      this.store.dispatch(new fromRecipes.UpdateRecipe({recipe: this.recipeForm.value, index: this.id}));
      this.recipeForm.reset();
    } else {
      // this.recipeService.addRecipe(newRecipe);
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new fromRecipes.AddRecipe(this.recipeForm.value));
      this.recipeForm.reset();
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  ngOnDestroy(): void {
    // Only unsubscribe if subscribed in the first place
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
