import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisCasaComponent } from './axis-casa.component';

describe('AxisCasaComponent', () => {
  let component: AxisCasaComponent;
  let fixture: ComponentFixture<AxisCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxisCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
