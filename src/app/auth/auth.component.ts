import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: AuthService) { }

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
    if (this.isLoginMode) {
      // ...
    } else {
      this.authService.signUp(form.value.email, form.value.password)
        .subscribe(response => {
          console.log(response);
          this.isLoading = false;
        }, errorRes => {
          this.error = errorRes;
          this.isLoading = false;
        });
    }
    form.reset();
  }
}
