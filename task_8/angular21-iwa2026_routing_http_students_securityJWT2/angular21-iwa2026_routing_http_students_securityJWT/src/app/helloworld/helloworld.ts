import { Component, inject, signal } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage-service';

@Component({
  selector: 'app-helloworld',
  imports: [],
  templateUrl: './helloworld.html',
  styleUrl: './helloworld.css',
})
export class Helloworld {
  protected readonly typedText = signal('');
  protected readonly selectedTopic = signal('JWT');
  protected readonly inputFocused = signal(false);
  protected readonly eventMessage = signal('Try the controls below.');

  private readonly tokenStorage = inject(TokenStorageService);

  protected onInput(value: string): void {
    this.typedText.set(value);
    this.eventMessage.set('Input event: the preview updates as you type.');
  }

  protected onEnter(value: string): void {
    this.typedText.set(value.trim());
    this.eventMessage.set('Key event: Enter was pressed.');
  }

  protected onFocus(): void {
    this.inputFocused.set(true);
    this.eventMessage.set('Focus event: the input is active.');
  }

  protected onBlur(): void {
    this.inputFocused.set(false);
    this.eventMessage.set('Blur event: the input lost focus.');
  }

  protected onTopicChange(value: string): void {
    this.selectedTopic.set(value);
    this.eventMessage.set('Change event: the selected topic was updated.');
  }

  protected clearMessage(): void {
    this.typedText.set('');
    this.eventMessage.set('Click event: the message was cleared.');
  }

  protected get username(): string {
    return this.tokenStorage.getUsername() ?? 'Guest';
  }
}
