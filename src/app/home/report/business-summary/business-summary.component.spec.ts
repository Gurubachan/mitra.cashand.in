import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSummaryComponent } from './business-summary.component';

describe('BusinessSummaryComponent', () => {
  let component: BusinessSummaryComponent;
  let fixture: ComponentFixture<BusinessSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
