import { inject, Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token-storage-service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly tokenStorage = inject(TokenStorageService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authRequest = req;
    const token = this.tokenStorage.getToken();
    if (token) {
      authRequest = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
    }
    return next.handle(authRequest);
  }
}
