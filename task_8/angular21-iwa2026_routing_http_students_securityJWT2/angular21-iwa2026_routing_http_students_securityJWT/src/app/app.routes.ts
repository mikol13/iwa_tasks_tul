import { Routes } from '@angular/router';
import {Helloworld} from './helloworld/helloworld';
import {Calculator} from './calculator/calculator';
import {Students} from './students/students';
import {RoleGuard} from './guards/role-guard';
import {User} from './user/user';
import {authGuard} from './guards/auth-guard';
import {Login} from './login/login';
import {Register} from './register/register';
import {Admin} from './admin/admin';

export const routes: Routes = [
  {path: 'hello', component: Helloworld, title: 'Helloworld'},
  {path: 'calculator', component: Calculator, title: 'Calculator'},
  { path: 'students', component: Students, canActivate: [authGuard] },
  { path: 'user', component: User, canActivate: [authGuard, RoleGuard], data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'admin', component: Admin, canActivate: [authGuard, RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'auth/login', component: Login },
  { path: 'signup', component: Register },
  { path: '', redirectTo: 'hello', pathMatch: 'full' },
  { path: '**', redirectTo: 'hello' },
];


