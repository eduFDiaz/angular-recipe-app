import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromAuthActions from 'src/app/auth/store/auth.actions';
import * as fromAppReducer from 'src/app/store/app.reducer';

import * as fromRecipesActions from 'src/app/recipes/store/recipes.actions';
import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  // The event will be accessible from outside (app parent component)
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromAppReducer.AppState>) {}

  ngOnInit() {
    this.userSubscription = this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !user ? false : true ;
      });
  }

  onFecthData() {
    console.log('[Header] Fetching data:');
    this.store.dispatch(new fromRecipesActions.FetchRecipes());
  }

  onSaveData() {
    console.log('[Header] Saving data:');
    this.dataStorageService.storeRecipes();
  }

  onLogout() {
    this.store.dispatch(new fromAuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
