import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { provideToastr } from 'ngx-toastr';

import { customHttpInterceptor } from './common/interceptors/custom-http.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([customHttpInterceptor])),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideMomentDateAdapter(
      {
        parse: { dateInput: 'DD.MM.YYYY' },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
      { useUtc: true },
    ),
    provideToastr({
      closeButton: true,
      progressBar: true,
      tapToDismiss: false,
      extendedTimeOut: 5000,
      timeOut: 5000,
      easeTime: 200,
      newestOnTop: false,
      positionClass: 'toast-bottom-right',
    }),
  ],
};
