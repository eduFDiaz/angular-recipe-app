import { NgModule } from '@angular/core';

import { ShortenPipe } from './shorten.pipe';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { MyMaterialModule } from './../material';


@NgModule({
  declarations: [
    ShortenPipe
  ],
  imports: [
    NgZorroAntdModule,
    MyMaterialModule
  ],
  exports: [
    ShortenPipe,
    NgZorroAntdModule,
    MyMaterialModule
  ]
})
export class SharedComponentsModule {

}
