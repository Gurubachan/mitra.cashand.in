import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcicinewComponent } from './icicinew.component';

describe('IcicinewComponent', () => {
  let component: IcicinewComponent;
  let fixture: ComponentFixture<IcicinewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcicinewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcicinewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
