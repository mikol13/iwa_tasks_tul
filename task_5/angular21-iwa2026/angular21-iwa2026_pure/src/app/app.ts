import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Calculator} from './calculator/calculator';
import {Helloworld} from './helloworld/helloworld';
import { FibonacciComponent } from './fibonacci/fibonacci';
import { QuadraticComponent } from './quadratic/quadratic';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Calculator, Helloworld, FibonacciComponent, QuadraticComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular21-iwa2026');
}
