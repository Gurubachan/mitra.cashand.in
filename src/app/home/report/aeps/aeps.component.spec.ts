import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepsComponent } from './aeps.component';

describe('AepsComponent', () => {
  let component: AepsComponent;
  let fixture: ComponentFixture<AepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
