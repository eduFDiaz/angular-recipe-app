import { RecipeModule } from './recipes/recipes.module';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { ShortenPipe } from './shared/shorten.pipe';
import { RecipeService } from './recipes/recipe.service';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
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
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    SpinnerComponent,
    DropdownDirective,
    PageNotFoundComponent,
    AuthComponent,
    ShortenPipe,
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
    RecipeModule
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
