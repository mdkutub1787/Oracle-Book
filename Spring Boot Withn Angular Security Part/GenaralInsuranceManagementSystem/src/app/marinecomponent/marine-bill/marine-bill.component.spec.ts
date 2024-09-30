import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBillComponent } from './marine-bill.component';

describe('MarineBillComponent', () => {
  let component: MarineBillComponent;
  let fixture: ComponentFixture<MarineBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarineBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarineBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
