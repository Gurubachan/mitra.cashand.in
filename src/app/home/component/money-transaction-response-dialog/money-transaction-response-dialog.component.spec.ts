import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTransactionResponseDialogComponent } from './money-transaction-response-dialog.component';

describe('MoneyTransactionResponseDialogComponent', () => {
  let component: MoneyTransactionResponseDialogComponent;
  let fixture: ComponentFixture<MoneyTransactionResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyTransactionResponseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTransactionResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
