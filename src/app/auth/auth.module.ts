import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { AuthGuard } from './auth.guard';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipesResolverService } from '../recipes/recipes-resolver.service';

@NgModule({
  declarations: [
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }])
  ],
  exports: [
    AuthComponent,
    LoadingSpinnerComponent,
    RouterModule
  ]
})
export class AuthModule { }
