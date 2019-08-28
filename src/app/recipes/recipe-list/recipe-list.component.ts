import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromAppReducer from 'src/app/store/app.reducer';

import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('recipes')
    .pipe(map( state => state.recipes))
    .subscribe( (recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
