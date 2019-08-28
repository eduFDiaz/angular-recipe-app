import { Subscription } from 'rxjs';
import { DataStorageService } from './../shared/data-storage.service';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as fromAuthActions from 'src/app/auth/store/auth.actions';
import { map } from 'rxjs/operators';

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
    this.onFecthData();
  }

  onFecthData() {
    console.log('[Header] Fetching data:');
    this.dataStorageService.fetchRecipes().subscribe();
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
