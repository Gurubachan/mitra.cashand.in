import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionRevisionComponent } from './commission-revision.component';

describe('CommissionRevisionComponent', () => {
  let component: CommissionRevisionComponent;
  let fixture: ComponentFixture<CommissionRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
