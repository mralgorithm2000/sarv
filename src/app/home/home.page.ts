import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonFab, IonFabButton, IonList, IonItem, IonLabel, IonModal } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { GratitudeEntryModalComponent } from '../components/gratitude-entry-modal/gratitude-entry-modal.component';
import { StorageService, GratitudeEntry } from '../services/storage.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    DatePipe,
    IonHeader,
    IonToolbar,
    IonContent,
    IonFab,
    IonFabButton,
    IonList,
    IonItem,
    IonLabel,
    IonModal,
    GratitudeEntryModalComponent
  ],
  standalone: true,
})
export class HomePage implements OnInit, OnDestroy {
  now: Date = new Date();
  gratitudeEntries: GratitudeEntry[] = [];
  timer: any;
  isModalOpen = false;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadEntries();
    this.timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  async loadEntries() {
    try {
      this.gratitudeEntries = await this.storageService.getEntries();
    } catch (error) {
      console.error('Error loading entries:', error);
      this.gratitudeEntries = [];
    }
  }

  openAddEntry() {
    this.isModalOpen = true;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (!isOpen) {
      this.loadEntries(); // Reload entries when modal is closed
    }
  }

  formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  async deleteEntry(date: string) {
    try {
      await this.storageService.deleteEntry(date);
      await this.loadEntries(); // Reload the entries after deletion
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  }
}
