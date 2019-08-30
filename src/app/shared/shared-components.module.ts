import { SpinnerComponent } from './../myspinner/myspinner.component';
import { NgModule } from '@angular/core';

import { ShortenPipe } from './shorten.pipe';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { MyMaterialModule } from './../material';

import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    ShortenPipe,
    SpinnerComponent
  ],
  imports: [
    NgZorroAntdModule,
    MyMaterialModule
  ],
  exports: [
    SpinnerComponent,
    ShortenPipe,
    NgZorroAntdModule,
    MyMaterialModule,
    MatGridListModule
  ]
})
export class SharedComponentsModule {

}
