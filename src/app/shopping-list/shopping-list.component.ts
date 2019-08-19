import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  // Subscription to subscribe to the Observer(Subject) ingredientsChanged
  private ingChangedSubs: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    // Suscribing to a service emitter is like capturing the signal
    // emitted as it worked in Qt, this case the ingredientsChanged
    // returns the array of Ingredient[] that we need
    this.ingChangedSubs = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    // Here we change the value to which the observer is listening using
    // the next method so another component susbscribed to it can be triggered
    // at the shopping-edit component let's say
    this.shoppingListService.startedEditing.next(index);
    console.log(index);
  }

  ngOnDestroy() {
    this.ingChangedSubs.unsubscribe();
  }
}
