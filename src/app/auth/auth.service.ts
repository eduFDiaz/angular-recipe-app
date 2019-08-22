import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient,
              private router: Router) { }

  // This type of subject gives subscribers the chance of
  // reading its properties even when the subscription happened
  // after they emited a new value with next
  user = new BehaviorSubject<User>(null);

  // Just to make the code more portable for the future
  API_KEY = 'AIzaSyB9VW0aJhlEHxlqjCWa9ynH9Kr-nBm1vAU';
  httpParams = new HttpParams().append('key', this.API_KEY);

  private tokenExpirationTimer: any;

  signUp(email: string, password: string) {
    // This method signs in the user. The first js object goes in the payload
    // section (email, password, returnSecureToken). The second js object has
    // the query params that go in url (?key=AIzaSyB9VW0aJhlEHxlqjCWa9ynH9Kr)
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {
        email,
        password,
        returnSecureToken: 'true'
      },
      {
        params: this.httpParams,
      }
    ).pipe(catchError(this.handleError),
    tap( resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      {
        email,
        password,
        returnSecureToken: 'true'
      },
      {
        params: this.httpParams,
      }
    ).pipe(catchError(this.handleError),
    tap( resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  autoLogin() {
    // Used this object because the date because of the date
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenEpirationDate: string
    } =  JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUsr = new User(userData.email,
                               userData.id,
                               userData._token,
                               new Date(userData._tokenEpirationDate));

    if (loadedUsr.token) {
      // Only if the token is valid this user will be used
      const expirationDuration = new Date(userData._tokenEpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUsr);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
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
    }, 10000);
  }

  private handleAuthentication(email: string, localId: string, token: string, expiresIn: number) {
    // This function handles authentication changing the value of the user Subject
    const expirationDate = new Date( new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);

    // Before saving to local storage the object has to be converted to a string
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error has ocurred!';
    if (!errorRes.error || !errorRes.error.error) {
       return throwError(errorMessage);
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
    return throwError(errorMessage);
  }
}
