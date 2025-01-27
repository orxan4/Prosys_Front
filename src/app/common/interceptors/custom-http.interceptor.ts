import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import urls from '../constants/urls';

import tokenService from '../services/token.service';

import { LoadingService } from '../services/loading.service';

export const customHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const toaster = inject(ToastrService);
  const router = inject(Router);
  loadingService.loadingStart();

  const update = {};
  if (tokenService.isLoggedIn()) {
    update['headers'] = tokenService.getAccessTokenWithinHttpHeaders();
  }

  const authRequest = req.clone(update);

  return next(authRequest).pipe(
    tap({
      next: (response: HttpEvent<any>) => {
        if (response instanceof HttpResponse && authRequest.url === urls.auth + '/login') {
          tokenService.setAccessToken(response.body['accessToken']);
        }
        if (200 <= response['status'] && response['status'] < 300) {
          loadingService.loadingEnd();
        }
      },
      error: async (r) => {
        const prefix = (!r.status ? 'Unknown' : 400 <= r.status && r.status < 500 ? 'Client ' : 'Server') + ' error';
        const status = r.status;
        const title = prefix + ': ' + status;
        const message = r.error.message || '';
        loadingService.loadingEnd();
        toaster.error(message, title);
        if (r.status === 401) {
          tokenService.deleteAccessToken();
          await router.navigate(['/login']);
        }
      },
      complete: () => {
        loadingService.loadingEnd();
      },
    }),
  );
};
