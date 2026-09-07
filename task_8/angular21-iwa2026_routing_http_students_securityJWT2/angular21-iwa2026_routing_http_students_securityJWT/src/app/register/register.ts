import { Component, inject, signal } from '@angular/core';
import { SignupInfo } from '../auth/signup-info';
import { AuthService } from '../auth/auth-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected form = { username: '', password: '' };
  protected readonly isSignedUp = signal(false);
  protected readonly isSignUpFailed = signal(false);
  protected readonly errorMessage = signal('');

  private readonly authService = inject(AuthService);

  protected onSubmit(): void {
    const signupInfo = new SignupInfo(
      this.form.username,
      this.form.password);

    this.authService.signUp(signupInfo).subscribe({
      next: () => {
        this.isSignedUp.set(true);
        this.isSignUpFailed.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message ?? 'Registration failed. Try a different username.');
        this.isSignUpFailed.set(true);
      },
    });
  }
}






