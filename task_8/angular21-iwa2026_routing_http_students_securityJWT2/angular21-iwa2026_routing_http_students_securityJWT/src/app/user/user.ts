import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  protected readonly message = signal('Loading protected content...');
  protected readonly errorMessage = signal('');

  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUserPage().subscribe({
      next: (data) => this.message.set(data),
      error: (error) => this.errorMessage.set(`Server request failed (${error.status}).`),
    });
  }
}
