import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyloansComponent } from './happyloans.component';

describe('HappyloansComponent', () => {
  let component: HappyloansComponent;
  let fixture: ComponentFixture<HappyloansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HappyloansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
