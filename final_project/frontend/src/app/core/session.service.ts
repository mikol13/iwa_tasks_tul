import { Injectable, signal } from '@angular/core';
import { LoginResponse, UserRole } from '../models/journal.models';

export interface StoredSession {
  token: string;
  username: string;
  roles: UserRole[];
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly storageKey = 'university-journal-session';
  readonly current = signal<StoredSession | null>(this.restore());

  save(response: LoginResponse): void {
    const session: StoredSession = {
      token: response.accessToken,
      username: response.username,
      roles: response.roles,
    };
    sessionStorage.setItem(this.storageKey, JSON.stringify(session));
    this.current.set(session);
  }

  clear(): void {
    sessionStorage.removeItem(this.storageKey);
    this.current.set(null);
  }

  hasRole(role: UserRole): boolean {
    return this.current()?.roles.includes(role) ?? false;
  }

  private restore(): StoredSession | null {
    const rawSession = sessionStorage.getItem(this.storageKey);
    if (!rawSession) return null;

    try {
      return JSON.parse(rawSession) as StoredSession;
    } catch {
      sessionStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
