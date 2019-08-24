import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

// If new and :id children were inverted that would make angular take new as id
// ant that would break the app, the order of the routes is very important
// that's why the 404 PageNotFoundComponent goes the last one
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes/*', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'auth', component: AuthComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
 // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
