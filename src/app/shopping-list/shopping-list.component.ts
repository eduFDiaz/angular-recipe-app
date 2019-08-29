import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromAppReducer from 'src/app/store/app.reducer';

import { Ingredient } from './../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[]}>;
  // Subscription to subscribe to the Observer(Subject) ingredientsChanged
  private ingChangedSubs: Subscription;

  constructor(
    private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    console.log('onEditItem with index: ', index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
  }
}
