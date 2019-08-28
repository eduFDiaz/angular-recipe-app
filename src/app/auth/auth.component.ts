import { Observable, Subject } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromAppReducer.AppState>) { }

  isLoginMode = true;
  isLoading = false;
  error: string = null;

ngOnInit() {
  this.store.select('auth').subscribe(authState => {
    this.isLoading = authState.loading;
    this.error = authState.authError;
  });
}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    //let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email, password}));
    }

    /* authObs.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorRes => {
      this.error = errorRes;
      this.isLoading = false;
    }); */

    form.reset();
  }

  onClose() {
    this.error = null;
  }

  ngOnDestroy() {
  }
}
