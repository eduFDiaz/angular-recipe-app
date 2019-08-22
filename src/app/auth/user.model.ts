export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private __tokenEpirationDate: Date
  ) { }

  get token() {
    if ( !this.__tokenEpirationDate || new Date() > this.__tokenEpirationDate) {
      return null;
    }
    return this._token;
  }
}
