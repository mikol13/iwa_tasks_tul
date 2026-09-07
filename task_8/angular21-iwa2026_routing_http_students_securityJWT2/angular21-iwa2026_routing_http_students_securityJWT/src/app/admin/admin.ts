import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  protected readonly message = signal('Loading protected content...');
  protected readonly errorMessage = signal('');

  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getAdminPage().subscribe({
      next: (data) => this.message.set(data),
      error: (error) => this.errorMessage.set(`Server request failed (${error.status}).`),
    });
  }
}
