import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    loadComponent: () => import('./splash/splash.page').then((m) => m.SplashPage),
    pathMatch: 'full',
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./onboarding/onboarding.page').then((m) => m.OnboardingPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
];
