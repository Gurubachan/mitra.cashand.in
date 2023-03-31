import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedAepsComponent } from './unified-aeps.component';

describe('UnifiedAepsComponent', () => {
  let component: UnifiedAepsComponent;
  let fixture: ComponentFixture<UnifiedAepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnifiedAepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnifiedAepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
