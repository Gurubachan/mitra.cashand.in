import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BconboardingComponent } from './bconboarding.component';

describe('BconboardingComponent', () => {
  let component: BconboardingComponent;
  let fixture: ComponentFixture<BconboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BconboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BconboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
