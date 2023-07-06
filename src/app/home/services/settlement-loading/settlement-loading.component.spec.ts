import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementLoadingComponent } from './settlement-loading.component';

describe('SettlementLoadingComponent', () => {
  let component: SettlementLoadingComponent;
  let fixture: ComponentFixture<SettlementLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlementLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
