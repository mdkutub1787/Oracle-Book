import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarineMoneyReceiptComponent } from './update-marine-money-receipt.component';

describe('UpdateMarineMoneyReceiptComponent', () => {
  let component: UpdateMarineMoneyReceiptComponent;
  let fixture: ComponentFixture<UpdateMarineMoneyReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateMarineMoneyReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMarineMoneyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
