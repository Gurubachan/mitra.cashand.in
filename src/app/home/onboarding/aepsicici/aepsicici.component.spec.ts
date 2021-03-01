import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepsiciciComponent } from './aepsicici.component';

describe('AepsiciciComponent', () => {
  let component: AepsiciciComponent;
  let fixture: ComponentFixture<AepsiciciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepsiciciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AepsiciciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
