import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatmComponent } from './matm.component';

describe('MatmComponent', () => {
  let component: MatmComponent;
  let fixture: ComponentFixture<MatmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
