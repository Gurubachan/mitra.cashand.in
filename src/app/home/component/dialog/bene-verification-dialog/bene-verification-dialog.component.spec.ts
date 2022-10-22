import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneVerificationDialogComponent } from './bene-verification-dialog.component';

describe('BeneVerificationDialogComponent', () => {
  let component: BeneVerificationDialogComponent;
  let fixture: ComponentFixture<BeneVerificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneVerificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
