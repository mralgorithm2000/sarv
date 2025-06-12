import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GratitudeEntryModalComponent } from './gratitude-entry-modal.component';

describe('GratitudeEntryModalComponent', () => {
  let component: GratitudeEntryModalComponent;
  let fixture: ComponentFixture<GratitudeEntryModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GratitudeEntryModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GratitudeEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
