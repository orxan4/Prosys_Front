import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import tokenService from '../services/token.service';

export const notLoggedInGuard: CanActivateFn = async () => {
  const router = inject(Router);

  if (!tokenService.isLoggedIn()) {
    await router.navigate(['/login']);
  }

  return true;
};
