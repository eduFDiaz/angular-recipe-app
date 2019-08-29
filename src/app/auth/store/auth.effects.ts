import { Action } from '@ngrx/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../user.model';
import { AuthService } from './../auth.service';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  // Just to make the code more portable for the future
  API_KEY = environment.API_KEY;
  httpParams = new HttpParams().append('key', this.API_KEY);

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((signupAction: AuthActions.SignUpStart) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: 'true'
        },
        {
          params: this.httpParams,
        }
      )
        .pipe(
          map(resData => {
            return this.handleAuthentication(resData);
          }),
          catchError(errorRes => {
            return this.handleError(errorRes);
          }),
        );
    }
    ));

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
            params: this.httpParams,
          }
        )
        .pipe(
          map(resData => {
            return this.handleAuthentication(resData);
          }),
          catchError(errorRes => {
            return this.handleError(errorRes);
          }
          )
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(( (authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
      this.router.navigate(['/']);
      }
    }
    )));

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
    localStorage.removeItem('userData');
    this.authService.clearLogoutTimer();
    this.router.navigate(['/auth']);
  })
  );

  @Effect({}) // In this case map is used because you want to return an event
  autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      // Used this object because the date because of the date
      const userData: {
        email: string,
        id: string,
        _token: string,
        __tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUsr = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData.__tokenExpirationDate),
      );

      if (loadedUsr.token) {
        const expirationDuration = new Date(userData.__tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        // Only if the token is valid the action will be executed
        return new AuthActions.AuthenticateSuccess({
          email: loadedUsr.email,
          userId: loadedUsr.id,
          token: loadedUsr.token,
          expirationDate: new Date(userData.__tokenExpirationDate),
          redirect: false
        });
      }
      return { type: 'DUMMY' };
    })
  );

  handleAuthentication = (resData: AuthResponseData) => {
    const expirationDate  = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.AuthenticateSuccess({
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expirationDate,
      redirect: true
    });
  }

  handleError = (errorRes) => {
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

}
