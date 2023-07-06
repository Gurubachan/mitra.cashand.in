import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutMasterComponent } from './payout-master.component';

describe('PayoutMasterComponent', () => {
  let component: PayoutMasterComponent;
  let fixture: ComponentFixture<PayoutMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
