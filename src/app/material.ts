import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatMenuModule
} from '@angular/material';

import { NgModule } from '@angular/core';

const MaterialComponents = [
  MatButtonModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MyMaterialModule { }
