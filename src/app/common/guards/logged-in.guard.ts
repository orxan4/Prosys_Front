import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import tokenService from '../services/token.service';

export const loggedInGuard: CanActivateFn = async () => {
  const router = inject(Router);

  if (tokenService.isLoggedIn()) {
    await router.navigate(['/dashboard']);
  }

  return true;
};
