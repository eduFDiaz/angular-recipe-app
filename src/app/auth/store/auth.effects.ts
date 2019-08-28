import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { throwError, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// Just to make the code more portable for the future
const API_KEY = environment.API_KEY;
const httpParams = new HttpParams().append('key', API_KEY);

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router) { }

  /*@Effect()
  authSignUp = this.actions$.pipe(
    //ofType(AuthActions.)
  );*/

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: 'true'
          },
          {
            params: httpParams,
          }
        )
        .pipe(
          map(resData => {
            /// ...
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return new AuthActions.AuthenticateSuccess({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate
            });
          }),
          catchError(errorRes => {
            let errorMessage = 'An unknown error has ocurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.AuthenticateFail(errorMessage));
            }
            switch (errorRes.error.error.message) {
              case 'INVALID_PASSWORD':
                errorMessage = 'The password entered is not valid';
                break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'No user is registered with the email entered';
                break;
              case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account';
                break;
              case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled';
                break;
              case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'All requests from this device are blocked due to unusual activity. Try again later.';
                break;
              case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
              default:
                break;
            }
            return of(new AuthActions.AuthenticateFail(errorMessage));
          }
          )
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    }
    )
  );
}
