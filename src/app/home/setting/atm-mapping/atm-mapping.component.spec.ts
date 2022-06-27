import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmMappingComponent } from './atm-mapping.component';

describe('AtmMappingComponent', () => {
  let component: AtmMappingComponent;
  let fixture: ComponentFixture<AtmMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtmMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
