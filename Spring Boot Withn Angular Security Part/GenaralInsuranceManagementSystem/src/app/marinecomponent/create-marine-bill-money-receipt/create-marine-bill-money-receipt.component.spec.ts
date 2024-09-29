import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarineBillMoneyReceiptComponent } from './create-marine-bill-money-receipt.component';

describe('CreateMarineBillMoneyReceiptComponent', () => {
  let component: CreateMarineBillMoneyReceiptComponent;
  let fixture: ComponentFixture<CreateMarineBillMoneyReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMarineBillMoneyReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMarineBillMoneyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
