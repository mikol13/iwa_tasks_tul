import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginInfo } from '../auth/login-info';
import { AuthService } from '../auth/auth-service';
import { TokenStorageService } from '../auth/token-storage-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  protected form = { username: '', password: '' };
  protected readonly isLoggedIn = signal(false);
  protected readonly isLoginFailed = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly roles = signal<string[]>([]);

  private readonly authService = inject(AuthService);
  private readonly tokenStorage = inject(TokenStorageService);

  // older approach/syntax for DI that still works
  // constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn.set(true);
      this.roles.set(this.tokenStorage.getAuthorities());
    }
  }

  protected onSubmit(): void {
    const loginInfo = new LoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(loginInfo).subscribe({
      next: (data) => {
        if (!data.accessToken || !data.username) {
          this.errorMessage.set('The server did not return a valid login response.');
          this.isLoginFailed.set(true);
          return;
        }

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities || []);
        this.isLoginFailed.set(false);
        this.isLoggedIn.set(true);
        this.roles.set(this.tokenStorage.getAuthorities());
        this.reloadPage();
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message ?? 'Login failed. Check your username and password.');
        this.isLoginFailed.set(true);
      },
    });
  }

  private reloadPage(): void {
    window.location.reload();
  }
}






