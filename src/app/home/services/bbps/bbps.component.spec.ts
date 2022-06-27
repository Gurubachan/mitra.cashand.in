import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbpsComponent } from './bbps.component';

describe('BbpsComponent', () => {
  let component: BbpsComponent;
  let fixture: ComponentFixture<BbpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
