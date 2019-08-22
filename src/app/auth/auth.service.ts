import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
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
  constructor(private http: HttpClient) { }

  user = new Subject<User>(); // Subject to emit changes on type User

  API_KEY = 'AIzaSyB9VW0aJhlEHxlqjCWa9ynH9Kr-nBm1vAU';
  httpParams = new HttpParams().append('key', this.API_KEY);

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

  private handleAuthentication(email: string, localId: string, token: string, expiresIn: number) {
    const expirationDate = new Date( new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, token, expirationDate);
    this.user.next(user);
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


/* https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

Property Name	Type	Description
email	string	The email for the user to create.
password	string	The password for the user to create.
returnSecureToken	boolean	Whether or not to return an ID and refresh token. Should always be true. */

/* idToken	string	A Firebase Auth ID token for the newly created user.
email	string	The email for the newly created user.
refreshToken	string	A Firebase Auth refresh token for the newly created user.
expiresIn	string	The number of seconds in which the ID token expires.
localId	string	The uid of the newly created user. */

// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

// Request Body Payload
// Property Name	Type	Description
// email	string	The email the user is signing in with.
// password	string	The password for the account.
// returnSecureToken	boolean	Whether or not to return an ID and refresh token. Should always be true.
// Response Payload
// Property Name	Type	Description
// idToken	string	A Firebase Auth ID token for the authenticated user.
// email	string	The email for the authenticated user.
// refreshToken	string	A Firebase Auth refresh token for the authenticated user.
// expiresIn	string	The number of seconds in which the ID token expires.
// localId	string	The uid of the authenticated user.
// registered	boolean	Whether the email is for an existing account.
