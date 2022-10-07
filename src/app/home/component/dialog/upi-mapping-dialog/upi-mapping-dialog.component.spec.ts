import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiMappingDialogComponent } from './upi-mapping-dialog.component';

describe('UpiMappingDialogComponent', () => {
  let component: UpiMappingDialogComponent;
  let fixture: ComponentFixture<UpiMappingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpiMappingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiMappingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
