import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../core/session.service';

const redirectToLogin = () => inject(Router).createUrlTree(['/login']);

export const studentGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  return session.hasRole('ROLE_STUDENT') ? true : redirectToLogin();
};

export const teacherGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  return session.hasRole('ROLE_TEACHER') ? true : redirectToLogin();
};
