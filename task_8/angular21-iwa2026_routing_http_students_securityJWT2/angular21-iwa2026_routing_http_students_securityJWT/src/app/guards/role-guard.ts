import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private readonly tokenStorage = inject(TokenStorageService);
  private readonly router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowedRoles = route.data['roles'] as string[];
    const hasAccess = allowedRoles.some((role) => this.tokenStorage.getAuthorities().includes(role));

    return hasAccess ? true : this.router.parseUrl('/hello');
  }
}

