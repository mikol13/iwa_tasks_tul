import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionService } from './core/session.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly session = inject(SessionService);
  private readonly router = inject(Router);
  readonly isStudent = computed(() => this.session.hasRole('ROLE_STUDENT'));
  readonly isTeacher = computed(() => this.session.hasRole('ROLE_TEACHER'));

  logout(): void {
    this.session.clear();
    void this.router.navigateByUrl('/login');
  }
}
