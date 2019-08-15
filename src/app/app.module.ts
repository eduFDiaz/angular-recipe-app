import { ShoppingListService } from './shopping-list/shopping-list.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { NgxPopper } from 'angular-popper';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

// config angular i18n //
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { SpinnerComponent } from './myspinner/myspinner.component';
import { DropdownDirective } from './shared/dropdown.directive';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    SpinnerComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    NgZorroAntdModule,
    NgxPopper
  ],
  providers: [ ShoppingListService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
