import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastagComponent } from './fastag.component';

describe('FastagComponent', () => {
  let component: FastagComponent;
  let fixture: ComponentFixture<FastagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
