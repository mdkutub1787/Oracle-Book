import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMarinemoneyReceiptComponent } from './print-marinemoney-receipt.component';

describe('PrintMarinemoneyReceiptComponent', () => {
  let component: PrintMarinemoneyReceiptComponent;
  let fixture: ComponentFixture<PrintMarinemoneyReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintMarinemoneyReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintMarinemoneyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
