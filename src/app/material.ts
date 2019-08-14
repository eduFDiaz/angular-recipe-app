import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule],
  exports: [MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class MyMaterialModule { }
