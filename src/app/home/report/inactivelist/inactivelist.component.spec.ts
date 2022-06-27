import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivelistComponent } from './inactivelist.component';

describe('InactivelistComponent', () => {
  let component: InactivelistComponent;
  let fixture: ComponentFixture<InactivelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactivelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactivelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
