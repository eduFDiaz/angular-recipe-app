import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAuthActions from 'src/app/auth/store/auth.actions';
import * as fromAppReducer from 'src/app/store/app.reducer';

import * as fromRecipesActions from 'src/app/recipes/store/recipes.actions';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {
  // The event will be accessible from outside (app parent component)
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private breakpointObserver: BreakpointObserver,
              private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.userSubscription = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !user ? false : true;
      });
  }

  onFecthData() {
    console.log('[Header] Fetching data:');
    this.store.dispatch(new fromRecipesActions.FetchRecipes());
  }

  onSaveData() {
    console.log('[Header] Saving data:');
    this.store.dispatch(new fromRecipesActions.SaveRecipes());
  }

  onLogout() {
    this.store.dispatch(new fromAuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
