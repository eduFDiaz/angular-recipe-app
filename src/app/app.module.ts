import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxPopper } from 'angular-popper';
import { en_US, NZ_I18N } from 'ng-zorro-antd';
import { AuthEffects } from 'src/app/auth/store/auth.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { RecipesModule } from './recipes/recipes.module';
import { SharedComponentsModule } from './shared/shared-components.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import * as fromAppReducer from './store/app.reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipesEffects } from './recipes/store/recipes.effects';
// config angular i18n //
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
    StoreModule.forRoot(fromAppReducer.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, RecipesEffects])
  ],
  providers: [// The rest of the services are provided in CoreModule
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
