import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const LOGIN_START = '[Auth] Login start';
export const AUTHENTICATE_FAIL = '[Auth] Login fail';

export const SIGN_UP_START = '[Auth] Sign up start';
export const SIGN_UP = '[Auth] Sign up';
export const SIGN_UP_FAIL = '[Auth] Sign up start';

export const LOGOUT = '[Auth] Logout';

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;
  constructor( public payload: { email: string, password: string}) {}
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
  constructor( public payload: { email: string, password: string}) {}
}

export class SignUpFail implements Action {
  readonly type = SIGN_UP_FAIL;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor( public payload: { email: string, password: string}) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      email: string,
      userId: string,
      token: string,
      expirationDate: Date
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor( public payload: string ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}
export type AuthActions =
AuthenticateSuccess | Logout | LoginStart | AuthenticateFail |
    SignUpStart | SignUp | SignUpFail;
