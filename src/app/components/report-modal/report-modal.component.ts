import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertComponent } from '../alert/alert.component';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AlertComponent]
})
export class ReportModalComponent {
  @Input() gratitudeId!: number;

  text = '';
  type = 'spam';
  isSubmitting = false;
  errors: any = {};

  // Alert state
  alert = {
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  };

  types = [
    { name: 'اسپم', value: 'spam' },
    { name: 'سوء استفاده', value: 'abuse' },
    { name: 'محتوای توهین‌آمیز', value: 'offensive' },
    { name: 'سایر', value: 'other' }
  ];

  constructor(
    private reportService: ReportService,
    private modalCtrl: ModalController
  ) {}

  closeModal(submitted = false, message = '') {
    this.modalCtrl.dismiss({ 
      submitted: submitted,
      message: message
    });
  }

  submit() {
    this.isSubmitting = true;
    this.errors = {};

    this.reportService.sendReport(this.gratitudeId, this.text, this.type).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          this.showAlert(res.message || 'گزارش با موفقیت ارسال شد', 'success');
          this.closeModal(true, res.message)
        } else {
          this.showAlert(res.message || 'ارسال گزارش ناموفق بود', 'error');
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.error?.errors) {
          this.errors = err.error.errors;
        } else {
          const message = err.error?.message || 'خطایی رخ داده است';
          this.showAlert(message, 'error');
        }
      }
    });
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alert = { message, type, show: true };
  }
}
