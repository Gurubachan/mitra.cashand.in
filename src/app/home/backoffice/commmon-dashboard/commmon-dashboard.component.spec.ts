import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommmonDashboardComponent } from './commmon-dashboard.component';

describe('CommmonDashboardComponent', () => {
  let component: CommmonDashboardComponent;
  let fixture: ComponentFixture<CommmonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommmonDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommmonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
