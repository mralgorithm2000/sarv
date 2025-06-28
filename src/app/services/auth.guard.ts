import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuth = await this.storageService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/']); // Redirect to splash
      return false;
    }
    return true;
  }
} 