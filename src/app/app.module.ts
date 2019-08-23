import { RecipeModule } from './recipes/recipes.module';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { RecipeService } from './recipes/recipe.service';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgxPopper } from 'angular-popper';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

// config angular i18n //
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedComponentsModule } from './shared/shared-components.module';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    NgZorroAntdModule,
    AppRoutingModule,
    NgxPopper,
    HttpClientModule,
    RecipeModule,
    ShoppingListModule,
    SharedComponentsModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
