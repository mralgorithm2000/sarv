import { Component } from '@angular/core';
import { IonContent, IonButton, IonInput, IonSpinner, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service'; 
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonInput, IonHeader, IonToolbar, IonTitle, FormsModule, IonSpinner],
})
export class LoginPage {
  loading = false;
  error = '';
  success = false;

  email = '';
  password = '';

  email_error= '';
  password_error = '';
 
  constructor(private router: Router,private loginService: LoginService, private storageService: StorageService, private alertCtrl: AlertController) {}

  async submit() {
    this.loading = true;
    this.error = '';
    this.success = false;
    this.email_error = '';
    this.password_error = '';
    try {
      const formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);

      this.loginService.login(formData).subscribe({
        next: async (res) => {
          await this.storageService.saveToken(res.token);
          this.success = true;
          this.router.navigate(['/home']);
        },
        error: async (e) => {
          this.email_error = e.error?.errors?.email;
          this.password_error = e.error?.errors?.password;
          this.loading = false;
          if (!this.email_error && !this.password_error && e.error?.message) {
            await this.showBottomAlert(e.error.message);
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
    } catch (e: any) {
      this.error = e.message || 'خطا در ورود ';
      this.loading = false;
      await this.showBottomAlert(this.error);
    }
  }

  async showBottomAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message,
      cssClass: 'bottom-slide-alert',
      buttons: ['باشه'],
      animated: true,
      mode: 'ios',
    });
    await alert.present();
  }

  backToSplash() {
    this.router.navigate(['/onboarding']);
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}