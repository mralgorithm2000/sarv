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
      title: 'به سرو خوش آمدید!',
      description: 'اینجا آرامش و رشد درونی شما شکل میگیرد <br> سرو، همدم روزانه‌ی ثبت لحظه‌های شکرگزاری شماست.',
      image: 'assets/imgs/onboarding-1.png'
    },
    {
      title: 'چرا شکرگزاری؟!',
      description: "شکرگزاری، بر اساس یافته‌های جدید علمی، آرامش ذهن، شادی و رضایت را افزایش می‌دهد. <br> هر روز، فرصتی است برای قدردانی از زیبایی‌ها و لحظه‌های کوچک زندگی.",
      image: 'assets/imgs/onboarding-2.png'
    },
    {
      title: 'شبکه‌سازی',
      description: 'اگه دوست داشتی، می‌تونی شکرگزاری‌هات رو با بقیه به اشتراک بذاری <br/> و همچنین شکرگزاری‌های عمومی بقیه رو هم ببینی!',
      image: 'assets/imgs/onboarding-3.png'
    }
  ];

  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

} 