import { DataStorageService } from './../shared/data-storage.service';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  // The event will be accessible from outside (app parent component)
  @Output() featureSelected = new EventEmitter<string>();

  ngOnInit() {
    this.onFecthData();
  }

  constructor(private dataStorageService: DataStorageService) {}

  onSelect(feature: string) {
    // featureSelected will emit either those two strings
    // that are given at the links at the bar
    this.featureSelected.emit(feature);
  }

  onFecthData() {
    console.log('[Header] Fetching data:');
    this.dataStorageService.fetchRecipes();
  }
  onSaveData() {
    console.log('[Header] Saving data:');
    this.dataStorageService.storeRecipes();
  }
}
