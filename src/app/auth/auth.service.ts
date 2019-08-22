import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    // This method signs in the user
    const API_KEY = 'AIzaSyB9VW0aJhlEHxlqjCWa9ynH9Kr-nBm1vAU';

    let httpParams = new HttpParams();
    httpParams = httpParams.append('key', API_KEY);

    // First js object goes in the payload section (email, password, returnSecureToken)
    // The second js object has the query params that go in url (?key=AIzaSyB9VW0aJhlEHxlqjCWa9ynH9Kr)
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {
        email,
        password,
        returnSecureToken: 'true'
      },
      {
        params: httpParams,
      }
    ).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error has ocurred!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'The email address is already in use by another account';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'All requests from this device are blocked due to unusual activity. Try again later.';
          break;
        default:
          break;
      }
      return throwError(errorMessage);
    }));
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
