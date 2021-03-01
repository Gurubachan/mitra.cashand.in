import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycdialogComponent } from './kycdialog.component';

describe('KycdialogComponent', () => {
  let component: KycdialogComponent;
  let fixture: ComponentFixture<KycdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
