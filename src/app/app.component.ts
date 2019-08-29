import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAppReducer from './store/app.reducer';
import * as fromAuthActions from './auth/store/auth.actions';
import * as fromRecipesActions from 'src/app/recipes/store/recipes.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Recipe App';
  constructor(private store: Store<fromAppReducer.AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(new fromAuthActions.AutoLogin());
    // this.store.dispatch(new fromRecipesActions.FetchRecipes());
  }
}
