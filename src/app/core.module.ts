import { AuthInterceptor } from './auth/auth-interceptor.service';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Provide all services here or in the app module if you want to pass the
// same instance of the services to every component throughout the app
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
})
export class CoreModule {

}
