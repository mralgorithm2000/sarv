import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

register();

@Component({
  selector: 'app-onboarding',
  templateUrl: 'onboarding.page.html',
  styleUrls: ['onboarding.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnboardingPage {
  slides = [
    {
      title: 'Welcome to Sarv',
      description: 'Your daily gratitude companion',
      image: 'assets/onboarding-1.svg'
    },
    {
      title: 'Track Your Gratitude',
      description: "Record what you're grateful for each day",
      image: 'assets/onboarding-2.svg'
    },
    {
      title: 'Build a Positive Mindset',
      description: 'Develop a habit of gratitude and mindfulness',
      image: 'assets/onboarding-3.svg'
    }
  ];

  constructor(private router: Router) {}

  finishOnboarding() {
    this.router.navigate(['/home']);
  }
} 