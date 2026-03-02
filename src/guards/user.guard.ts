import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('authToken');

  if (user) return true;

  const url: string = state.url;
  return router.createUrlTree(['login'], {
    queryParams: {
      redirect: url,
    },
  });
};
