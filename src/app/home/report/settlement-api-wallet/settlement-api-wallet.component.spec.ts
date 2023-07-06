import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementApiWalletComponent } from './settlement-api-wallet.component';

describe('SettlementApiWalletComponent', () => {
  let component: SettlementApiWalletComponent;
  let fixture: ComponentFixture<SettlementApiWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlementApiWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementApiWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
