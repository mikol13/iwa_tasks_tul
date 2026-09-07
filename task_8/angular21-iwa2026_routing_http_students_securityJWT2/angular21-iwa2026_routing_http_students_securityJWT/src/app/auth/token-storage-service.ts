import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  signOut(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  saveUsername(username: string): void {
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  getUsername(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  saveAuthorities(authorities: Array<{ authority: string }>): void {
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  getAuthorities(): string[] {
    const savedAuthorities = sessionStorage.getItem(AUTHORITIES_KEY);
    if (!savedAuthorities) {
      return [];
    }

    try {
      return JSON.parse(savedAuthorities).map((item: { authority: string }) => item.authority);
    } catch {
      return [];
    }
  }
}






