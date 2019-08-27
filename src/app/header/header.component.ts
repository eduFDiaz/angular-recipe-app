import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  // The event will be accessible from outside (app parent component)
  @Output() featureSelected = new EventEmitter<string>();
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromAppReducer.AppState>) {}

  ngOnInit() {
    this.userSubscription = this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !user ? false : true ;
      });
    this.onFecthData();
    /* this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true ;
    }); */
  }

  onSelect(feature: string) {
    // featureSelected will emit either those two strings
    // that are given at the links at the bar
    this.featureSelected.emit(feature);
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
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
