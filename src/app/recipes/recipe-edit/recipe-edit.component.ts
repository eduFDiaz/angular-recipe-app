import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  constructor( private route: ActivatedRoute) {
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
      }
    );
  }
}
