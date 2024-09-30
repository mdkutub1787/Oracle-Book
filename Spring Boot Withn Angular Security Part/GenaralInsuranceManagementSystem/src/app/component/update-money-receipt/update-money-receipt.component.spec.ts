import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMoneyReceiptComponent } from './update-money-receipt.component';

describe('UpdateMoneyReceiptComponent', () => {
  let component: UpdateMoneyReceiptComponent;
  let fixture: ComponentFixture<UpdateMoneyReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateMoneyReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMoneyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
