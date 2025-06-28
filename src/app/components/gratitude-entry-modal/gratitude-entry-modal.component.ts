import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ModalController } from '@ionic/angular/standalone';
import { GratitudeService } from '../../services/gratitude.service';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular'; // ✅ Add this

@Component({
  selector: 'app-gratitude-entry-modal',
  templateUrl: './gratitude-entry-modal.component.html',
  styleUrls: ['./gratitude-entry-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class GratitudeEntryModalComponent implements OnInit {
  gratitudeText: string = '';
  type: string = 'public';
  postImage: string = '';
  imageFile: File | null = null;
  avatar_error = '';
  text_error = '';
  type_error = '';
  general_error = '';
  isSubmitting = false;

  constructor(
    private gratitudeService: GratitudeService,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.postImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit() { }

  async submitEntry() {
    this.text_error = '';
    this.type_error = '';
    this.avatar_error = '';
    this.general_error = '';
    if (!this.gratitudeText.trim()) {
      this.text_error = 'متن شکرگزاری الزامی است.';
    }
    if (!this.type) {
      this.type_error = 'نوع شکرگزاری را انتخاب کنید.';
    }
    if (this.text_error || this.type_error) {
      return;
    }
    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('text', this.gratitudeText.trim());
    formData.append('type', this.type);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
    try {
      await this.gratitudeService.createGratitude(formData);
      this.resetForm();
      await this.modalCtrl.dismiss();
    } catch (error: any) {
      if (error.errors) {
        this.text_error = error.errors.text ? error.errors.text[0] : '';
        this.type_error = error.errors.type ? error.errors.type[0] : '';
        this.avatar_error = error.errors.image ? error.errors.image[0] : '';
      }
      if (error.message) {
        this.showBottomAlert(error.message);
      }
    } finally {
      this.isSubmitting = false;
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

  resetForm() {
    this.gratitudeText = '';
    this.type = '';
    this.postImage = '';
    this.imageFile = null;
    this.avatar_error = '';
    this.text_error = '';
    this.type_error = '';
    this.general_error = '';
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
