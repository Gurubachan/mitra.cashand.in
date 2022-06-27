import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicReceiptComponent } from './lic-receipt.component';

describe('LicReceiptComponent', () => {
  let component: LicReceiptComponent;
  let fixture: ComponentFixture<LicReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
