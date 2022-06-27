import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalServiceComponent } from './global-service.component';

describe('GlobalServiceComponent', () => {
  let component: GlobalServiceComponent;
  let fixture: ComponentFixture<GlobalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
