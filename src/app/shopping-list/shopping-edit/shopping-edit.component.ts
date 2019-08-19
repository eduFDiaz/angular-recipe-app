import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from './../shopping-list.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    // This method returns the ingredient amount and it's name
    const ingName = form.value.name;
    const ingAmount = +form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
