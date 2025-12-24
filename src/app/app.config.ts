import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpInterceptorBasicAuthService } from './service/data/http/http-interceptor-basic-auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
    ),{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorBasicAuthService,
      multi:true
    }
  ]
};
