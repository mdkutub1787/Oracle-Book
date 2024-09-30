import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBillDetailsComponent } from './marine-bill-details.component';

describe('MarineBillDetailsComponent', () => {
  let component: MarineBillDetailsComponent;
  let fixture: ComponentFixture<MarineBillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarineBillDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarineBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
