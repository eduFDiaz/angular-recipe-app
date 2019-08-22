import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

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
    private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true ;
    });
    this.onFecthData();
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
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
