import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTextarea, IonButton, IonDatetime, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-gratitude-entry-modal',
  templateUrl: './gratitude-entry-modal.component.html',
  styleUrls: ['./gratitude-entry-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTextarea,
    IonButton,
    IonDatetime,
    IonButtons,
    IonIcon
  ]
})
export class GratitudeEntryModalComponent implements OnInit {
  gratitudeText: string = '';
  currentDate: Date = new Date();

  constructor(
    private storageService: StorageService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async submitEntry() {
    if (this.gratitudeText.trim()) {
      const entry = {
        text: this.gratitudeText.trim(),
        date: new Date().toISOString()
      };
      
      try {
        await this.storageService.saveEntry(entry);
        this.gratitudeText = ''; // Clear the form
        await this.modalCtrl.dismiss();
      } catch (error) {
        console.error('Error saving entry:', error);
      }
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
