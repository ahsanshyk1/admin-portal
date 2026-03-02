import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAuthenticated = localStorage.getItem('authToken');

  if (isAuthenticated) {
    // logged in → redirect to dashboard
    return router.createUrlTree(['/dashboard']);
  }

  // not logged in → allow access to login page
  return true;
};
