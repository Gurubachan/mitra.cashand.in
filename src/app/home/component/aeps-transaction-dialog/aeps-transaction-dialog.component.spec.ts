import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepsTransactionDialogComponent } from './aeps-transaction-dialog.component';

describe('AepsTransactionDialogComponent', () => {
  let component: AepsTransactionDialogComponent;
  let fixture: ComponentFixture<AepsTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepsTransactionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AepsTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
