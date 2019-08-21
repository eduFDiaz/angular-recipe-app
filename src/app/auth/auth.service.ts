import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    // httpParams = httpParams.append('email', email);
    // httpParams = httpParams.append('password', password);
    // httpParams = httpParams.append('returnSecureToken', 'true');

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {
        params: httpParams,
        email: email,
        password: password,
        returnSecureToken: 'true'
      }
    );
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
