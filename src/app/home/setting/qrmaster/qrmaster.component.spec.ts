import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRMasterComponent } from './qrmaster.component';

describe('QRMasterComponent', () => {
  let component: QRMasterComponent;
  let fixture: ComponentFixture<QRMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QRMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
