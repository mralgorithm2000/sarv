import { Component } from '@angular/core';
import { IonContent, IonButton, IonInput, IonSpinner, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { StorageService } from '../services/storage.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonInput, IonSpinner, IonIcon, IonHeader, IonToolbar, IonTitle, FormsModule, HttpClientModule],
})
export class RegisterPage {
  step = 0;
  loading = false;
  error = '';
  success = false;

  name = '';
  username = '';
  email = '';
  password = '';
  profileImage: string | null = null;

  name_error = '';
  username_error = '';
  email_error = '';
  password_error = '';
  avatar_error = '';

  constructor(private router: Router, private registerService: RegisterService, private storageService: StorageService) { }

  nextStep() {
    if (this.step < 3) this.step++;
  }
  prevStep() {
    if (this.step > 0) this.step--;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async submit() {
    this.loading = true;
    this.error = '';
    this.success = false;
    try {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('username', this.username);
      formData.append('email', this.email);
      formData.append('password', this.password);
      if (this.profileImage) {
        const arr = this.profileImage.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (mimeMatch) {
          const mime = mimeMatch[1];
          const bstr = atob(arr[1]);
          const n = bstr.length;
          const u8arr = new Uint8Array(n);
          for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
          formData.append('profile_image', new Blob([u8arr], { type: mime }), 'profile.jpg');
        }
      }
      this.registerService.register(formData).subscribe({
        next: async (res) => {
          await this.storageService.saveToken(res.token);
          this.success = true;
          this.router.navigate(['/home']);
        },
        error: (e) => {
          this.name_error = e.error?.errors?.name;
          this.username_error = e.error?.errors?.username;
          this.email_error = e.error?.errors?.email;
          this.password_error = e.error?.errors?.password;
          this.avatar_error = e.error?.errors?.avatar;
          this.loading = false;

          if(this.name_error || this.username_error){
            this.step = 0
          }else if(this.email_error || this.password_error){
            this.step = 1
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
    } catch (e: any) {
      this.error = e.message || 'خطا در ثبت نام';
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToSplash() {
    this.router.navigate(['/onboarding']);
  }
} 