import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AlertComponent implements OnChanges {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'success';
  @Input() timer: number = 3000;
  @Input() show: boolean = false;

  @Output() closed = new EventEmitter<void>();

  visible = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && this.show) {
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
        this.closed.emit(); // Notify parent
      }, this.timer);
    }
  }

  dismiss() {
    this.visible = false;
    this.closed.emit(); // Notify parent
  }

  getColorClass() {
    return {
      success: 'success',
      error: 'danger',
      info: 'primary',
    }[this.type] || 'medium';
  }
}
