import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepsnewComponent } from './aepsnew.component';

describe('AepsnewComponent', () => {
  let component: AepsnewComponent;
  let fixture: ComponentFixture<AepsnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepsnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AepsnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
