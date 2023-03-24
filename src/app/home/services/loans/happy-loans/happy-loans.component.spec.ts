import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyLoansComponent } from './happy-loans.component';

describe('HappyLoansComponent', () => {
  let component: HappyLoansComponent;
  let fixture: ComponentFixture<HappyLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HappyLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
