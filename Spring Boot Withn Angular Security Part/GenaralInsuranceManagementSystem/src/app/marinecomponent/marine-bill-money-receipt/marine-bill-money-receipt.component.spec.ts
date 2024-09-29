import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineBillMoneyReceiptComponent } from './marine-bill-money-receipt.component';

describe('MarineBillMoneyReceiptComponent', () => {
  let component: MarineBillMoneyReceiptComponent;
  let fixture: ComponentFixture<MarineBillMoneyReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarineBillMoneyReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarineBillMoneyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
