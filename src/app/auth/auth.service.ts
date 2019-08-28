import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// The same instance of the service will be
// provided to all the components of the app :)
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor( private http: HttpClient,
               private router: Router,
               private store: Store<fromAppReducer.AppState>) { }

  // This type of subject gives subscribers the chance of
  // reading its properties even when the subscription happened
  // after they emitted a new value with next
  // user = new BehaviorSubject<User>(null);

  // Just to make the code more portable for the future
  API_KEY = environment.API_KEY;
  httpParams = new HttpParams().append('key', this.API_KEY);

  private tokenExpirationTimer: any;

  autoLogin() {
    // Used this object because the date because of the date
    const userData: {
      email: string,
      id: string,
      _token: string,
      __tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUsr = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData.__tokenExpirationDate)
    );

    if (loadedUsr.token) {
      // Only if the token is valid this user will be used
      // this.user.next(loadedUsr);
      const expirationDuration = new Date(userData.__tokenExpirationDate).getTime() - new Date().getTime();
      this.store.dispatch(new AuthActions.AuthenticateSuccess({
        email: loadedUsr.email,
        userId: loadedUsr.id,
        token: loadedUsr.token,
        expirationDate: new Date(userData.__tokenExpirationDate)
      }));
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    // expirationDuration is the number of seconds*1000 until the token is invalid
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    localId: string,
    token: string,
    expiresIn: number) {
    // This function handles authentication changing the value of the user Subject
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, token, expirationDate);
    // this.user.next(user);
    this.store.dispatch(
      new AuthActions.AuthenticateSuccess({
      email: email,
      userId: localId,
      token: token,
      expirationDate: expirationDate
    }));
    this.autoLogout(expiresIn * 1000);

    // Before saving to local storage the object has to be converted to a string
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
