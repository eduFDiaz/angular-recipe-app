import { User } from './user.model';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, exhaustMap, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
// private store: Store<fromAppReducer.AppState>

@Injectable() // Don't provide here, you want it to be available for every component
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private store: Store<fromAppReducer.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1), // this operator takes the first value emitted by the subject he is observing (user)
      map( authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if ( !user ) {
          // If the user doesn't exist the token will be undefined
          // so we don't pass a new modified request with auth param
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
        return next.handle(modifiedReq);
      })
    );
  }
}
