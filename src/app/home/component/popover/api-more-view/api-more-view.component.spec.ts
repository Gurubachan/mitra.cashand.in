import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMoreViewComponent } from './api-more-view.component';

describe('ApiMoreViewComponent', () => {
  let component: ApiMoreViewComponent;
  let fixture: ComponentFixture<ApiMoreViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiMoreViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
