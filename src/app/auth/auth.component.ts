import { Observable, Subject } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: AuthService) { }

  user = new Subject<User>();

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  email = 'fernandez9000@gmail.com';
  password = '123456';

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, errorRes => {
      this.error = errorRes;
      this.isLoading = false;
    });

    form.reset();
  }
}
