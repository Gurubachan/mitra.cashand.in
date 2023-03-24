import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBusinessSummaryComponent } from './team-business-summary.component';

describe('TeamBusinessSummaryComponent', () => {
  let component: TeamBusinessSummaryComponent;
  let fixture: ComponentFixture<TeamBusinessSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamBusinessSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBusinessSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
