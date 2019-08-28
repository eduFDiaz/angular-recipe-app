import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login start';
export const SIGN_UP_START = '[Auth] Sign up start';

export const AUTHENTICATE_SUCCESS = '[Auth] Login success';
export const AUTHENTICATE_FAIL = '[Auth] Login fail';

export const LOGOUT = '[Auth] Logout';

export const AUTO_LOGOUT = '[Auth] Auto logout';
export const AUTO_LOGIN = '[Auth] Auto login';

export const CLEAR_ERROR = '[Auth] Clear error';

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;
  constructor( public payload: { email: string, password: string}) {}
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

export class AutoLogout implements Action {
  readonly type = AUTO_LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
AuthenticateSuccess | Logout | LoginStart | AuthenticateFail |
    SignUpStart | ClearError | AutoLogin | AutoLogout ;
