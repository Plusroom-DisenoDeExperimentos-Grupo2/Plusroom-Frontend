import { Routes } from '@angular/router';
import { LandingComponent } from './auth/components/landing/landing.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import {ChooseRoleComponent} from './auth/components/choose-role/choose-role.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/landing', pathMatch: 'full' },
  { path: 'auth/landing', component: LandingComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/choose-role', component: ChooseRoleComponent }
];
