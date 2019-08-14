import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NgModule } from '@angular/core';

@NgModule({
  imports: [NzButtonModule, NzSpinModule],
  exports: [NzButtonModule, NzSpinModule],
})
export class AntdMaterialModule { }
