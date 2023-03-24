import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedaepsComponent } from './unifiedaeps.component';

describe('UnifiedaepsComponent', () => {
  let component: UnifiedaepsComponent;
  let fixture: ComponentFixture<UnifiedaepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnifiedaepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnifiedaepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
