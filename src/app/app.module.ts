import { LayoutModule } from '@angular/cdk/layout';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxPopper } from 'angular-popper';
import { en_US, NZ_I18N } from 'ng-zorro-antd';
import { AuthEffects } from 'src/app/auth/store/auth.effects';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MyMaterialModule } from './material';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesEffects } from './recipes/store/recipes.effects';
import { SharedComponentsModule } from './shared/shared-components.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import * as fromAppReducer from './store/app.reducer';

// config angular i18n //
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainNavComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
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
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [// The rest of the services are provided in CoreModule
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
