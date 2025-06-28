import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-splash',
  templateUrl: 'splash.page.html',
  styleUrls: ['splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton],
})
export class SplashPage implements OnInit {
  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    setTimeout(async () => {
      const token = await this.storageService.getToken();
      if (token) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/onboarding']);
      }
    }, 1000);
  }
} 