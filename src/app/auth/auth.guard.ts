import { User } from './user.model';
import { AuthComponent } from './auth.component';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.user.pipe(map( user => {
      const isAuth = !!user; // This will return true if the user is not null or undefined
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    } ));
  }
}
