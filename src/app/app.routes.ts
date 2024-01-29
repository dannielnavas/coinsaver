import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./domains/landing/pages/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./domains/side/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
