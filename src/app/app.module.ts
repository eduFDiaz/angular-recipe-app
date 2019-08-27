import { NgxPopper } from 'angular-popper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd';

// config angular i18n //
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from './core.module';
import { RecipesModule } from './recipes/recipes.module';
import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedComponentsModule } from './shared/shared-components.module';
import { AuthModule } from './auth/auth.module';

import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPopper,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    SharedComponentsModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [// The rest of the services are provided in CoreModule
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
