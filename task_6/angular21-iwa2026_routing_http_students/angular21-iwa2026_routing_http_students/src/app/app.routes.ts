import { Routes } from '@angular/router';
import { Helloworld } from './helloworld/helloworld';
import { Calculator } from './calculator/calculator';
import { Students } from './students/students';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'hello', component: Helloworld, title: 'HelloWorld' },
  { path: 'calculator', component: Calculator, title: 'Calculator' },
  { path: 'students', component: Students, title: 'Students' },
  { path: '**', redirectTo: 'students' },
];

