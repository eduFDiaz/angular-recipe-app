import { AfterContentInit, Component, ViewChild, OnDestroy } from '@angular/core';

import { FlexLayoutModule, MediaObserver, MediaChange } from '@angular/flex-layout';

import { MatGridList } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements AfterContentInit, OnDestroy {
  watcher: Subscription;
  @ViewChild('grid', {static: false}) grid: MatGridList;
  nCols = 1;

  gridByBreakpoint = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 1,
    xs: 1
  };

  constructor(private observableMedia: MediaObserver) {}

  ngAfterContentInit() {
    this.watcher = this.observableMedia.media$.subscribe( (change: MediaChange) => {
      console.log(this.gridByBreakpoint[change.mqAlias]);
      this.nCols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }
}
