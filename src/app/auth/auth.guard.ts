import { User } from './user.model';
import { AuthComponent } from './auth.component';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
// private store: Store<fromAppReducer.AppState>

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromAppReducer.AppState>
              ) {}
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map( authState => {
        return authState.user;
      }),
      map( user => {
      const isAuth = !!user; // This will return true if the user is not null or undefined
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    } ));
  }
}
