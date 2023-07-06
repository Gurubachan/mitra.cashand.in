import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementApiWalletTransactionComponent } from './settlement-api-wallet-transaction.component';

describe('SettlementApiWalletTransactionComponent', () => {
  let component: SettlementApiWalletTransactionComponent;
  let fixture: ComponentFixture<SettlementApiWalletTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlementApiWalletTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementApiWalletTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
