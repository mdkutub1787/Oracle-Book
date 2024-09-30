import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineMaoneyReceiptComponent } from './marine-maoney-receipt.component';

describe('MarineMaoneyReceiptComponent', () => {
  let component: MarineMaoneyReceiptComponent;
  let fixture: ComponentFixture<MarineMaoneyReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarineMaoneyReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarineMaoneyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
