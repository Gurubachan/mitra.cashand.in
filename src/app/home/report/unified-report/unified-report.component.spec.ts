import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedReportComponent } from './unified-report.component';

describe('UnifiedReportComponent', () => {
  let component: UnifiedReportComponent;
  let fixture: ComponentFixture<UnifiedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnifiedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnifiedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
