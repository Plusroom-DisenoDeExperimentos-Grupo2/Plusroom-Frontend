import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {ChooseRoleComponent} from './components/choose-role/choose-role.component';

export const authRoutes: Routes = [
  { path: 'auth/landing', component: LandingComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/choose-role', component: ChooseRoleComponent }
];
