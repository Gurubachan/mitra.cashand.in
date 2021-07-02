import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbpTransactionDialogComponent } from './rbp-transaction-dialog.component';

describe('RbpTransactionDialogComponent', () => {
  let component: RbpTransactionDialogComponent;
  let fixture: ComponentFixture<RbpTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbpTransactionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbpTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
