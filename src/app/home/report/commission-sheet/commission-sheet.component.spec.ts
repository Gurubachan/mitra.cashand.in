import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionSheetComponent } from './commission-sheet.component';

describe('CommissionSheetComponent', () => {
  let component: CommissionSheetComponent;
  let fixture: ComponentFixture<CommissionSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
