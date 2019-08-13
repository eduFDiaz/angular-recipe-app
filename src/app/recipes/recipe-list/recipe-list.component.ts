import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Baked lamb','Exquisite baked lamb ribs','https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Roasted potatoes','Delicious roasted potatoes slices','https://thecozyapron.com/wp-content/uploads/2018/03/dijon-roasted-potatoes_thecozyapron_1.jpg'),
    new Recipe('Boiled eggs','Boiled eggs with salt and garlic','https://live.staticflickr.com/7838/46602248784_1b5fcc443d_b.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
