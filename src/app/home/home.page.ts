import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GratitudeEntryModalComponent } from '../components/gratitude-entry-modal/gratitude-entry-modal.component';
import { StorageService, GratitudeEntry } from '../services/storage.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component as NgComponent, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // ✅ Add this
import { PopoverController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { HomeService } from '../services/home.service';
import { ReportModalComponent } from '../components/report-modal/report-modal.component';
import { ModalController } from '@ionic/angular';
import { AlertComponent } from '../components/alert/alert.component';

interface Post {
  id: number;
  profilePic: string;
  profileName: string;
  username: string;
  timePosted: Date;
  content: string;
  image?: string;
  liked: boolean;
  showFull: boolean;
}

@Component({
  selector: 'app-post-menu-popover',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-list class="popover-list">
      <ion-item button (click)="report()" lines="none" class="popover-item">
        <ion-icon name="alert-circle-outline" slot="start" class="popover-icon"></ion-icon>
        گزارش پست
      </ion-item>
    </ion-list>
  `,
  styles: [`
    ion-list{
      padding: 0;
    }
    ion-item, ion-list {
      --background: #ffffff;
      background: #ffffff;
      border-radius: 20px;
      color: #333;
    }
    ion-icon{
      color: #333;    
      --color: #333; 
      padding: 0 10px 0 0;
      margin: 0;
      
    }
     .popover-content{
  width: 150px !important;
}
  `]
})
export class PostMenuPopoverComponent {
  @Input() post: any;

  constructor(private popoverCtrl: PopoverController) { }

  report() {
    this.popoverCtrl.dismiss('report');
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    DatePipe,
    GratitudeEntryModalComponent,
    PostMenuPopoverComponent,
    IonicModule,
    AlertComponent
  ],
  standalone: true,
})
export class HomePage implements OnInit, OnDestroy {
  now: Date = new Date();
  gratitudeEntries: GratitudeEntry[] = [];
  timer: any;
  isModalOpen = false;
  posts: Post[] = [];
  currentPage = 1;
  hasMore = true;
  isLoading = false;
  apiUrl = 'http://127.0.0.1:8000/api/v1/gratitudes';

  // Alert state
  alert = {
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  };

  constructor(
    private storageService: StorageService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private router: Router,
    private homeService: HomeService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadPosts();
    this.timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  openAddEntry() {
    this.isModalOpen = true;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (!isOpen) {
      this.posts = [];
      this.currentPage = 1;
      this.hasMore = true;
      this.loadPosts();
    }
  }

  formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  toggleLike(post: Post) {
    post.liked = !post.liked;
  }

  toggleShowFull(post: Post) {
    post.showFull = !post.showFull;
  }

  getDisplayContent(post: Post): string {
    if (post.showFull || post.content.length <= 200) {
      return post.content;
    }
    return post.content.slice(0, 200) + '...';
  }

  async openPostMenu(ev: Event, post: Post) {
    const popover = await this.popoverCtrl.create({
      component: PostMenuPopoverComponent,
      componentProps: { post },
      event: ev,
      translucent: true,
      showBackdrop: true,
      cssClass: 'custom-popover',
    });
    popover.onDidDismiss().then((result) => {
      if (result.data === 'report') {
        this.openReportModal(post);
      }
    });
    await popover.present();
  }

  async openReportModal(post: Post) {
    const modal = await this.modalCtrl.create({
      component: ReportModalComponent,
      componentProps: { gratitudeId: post.id }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data?.submitted) {
        this.showAlert(result.data?.message, 'success');
      }
    });
    await modal.present();
  }


  showAlert(message: string, type: 'success' | 'error') {
    this.alert = { message, type, show: true };
  }
  async loadPosts(event?: any) {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    try {
      const result = await this.homeService.getPosts(this.currentPage);
      const data = result.data;
      if (data.length === 0) {
        this.hasMore = false;
        if (event) event.target.disabled = true;
        if (!event) this.showNoMoreAlert();
        return;
      }
      const newPosts = data.map((item: any) => ({
        id: item.id,
        profilePic: item.user.avatar,
        profileName: item.user.name,
        username: item.user.username,
        timePosted: new Date(),
        content: item.post.text,
        image: item.post.image,
        liked: false,
        showFull: false
      }));
      this.posts = [...this.posts, ...newPosts];
      this.currentPage++;
      if (!result.next_page_url) {
        this.hasMore = false;
        if (event) event.target.disabled = true;
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        await this.storageService.saveToken('');
        this.router.navigate(['/login']);
      } else {
        this.hasMore = false;
        if (event) event.target.disabled = true;
      }
    } finally {
      this.isLoading = false;
      if (event) event.target.complete();
    }
  }

  async showNoMoreAlert() {
    const alert = await this.alertCtrl.create({
      header: 'اطلاع',
      message: 'پست جدیدی وجود ندارد.',
      buttons: ['باشه']
    });
    await alert.present();
  }
}
