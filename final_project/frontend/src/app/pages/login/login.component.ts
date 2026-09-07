import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SessionService } from '../../core/session.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly session = inject(SessionService);
  private readonly router = inject(Router);

  username = 'jan.student';
  password = 'student123';
  readonly loading = signal(false);
  readonly errorMessage = signal('');

  signIn(form: NgForm): void {
    if (form.invalid) return;
    this.loading.set(true);
    this.errorMessage.set('');
    this.auth.login(this.username.trim(), this.password).subscribe({
      next: (response) => {
        this.session.save(response);
        const destination = response.roles.includes('ROLE_TEACHER') ? '/teacher' : '/student';
        void this.router.navigateByUrl(destination);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Sign-in failed. Check the credentials and make sure the backend is running.');
      },
      complete: () => this.loading.set(false),
    });
  }

  useDemo(username: string, password: string): void {
    this.username = username;
    this.password = password;
    this.errorMessage.set('');
  }
}
