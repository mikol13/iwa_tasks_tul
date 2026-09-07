import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TokenStorageService } from './auth/token-storage-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = 'IWA 8';
  protected readonly authority = signal('');
  protected readonly username = signal('');

  private readonly tokenStorage = inject(TokenStorageService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const roles = this.tokenStorage.getAuthorities();
    this.username.set(this.tokenStorage.getUsername() ?? '');
    this.authority.set(roles.includes('ROLE_ADMIN') ? 'admin' : roles.includes('ROLE_USER') ? 'user' : '');
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/hello');
  }
}


