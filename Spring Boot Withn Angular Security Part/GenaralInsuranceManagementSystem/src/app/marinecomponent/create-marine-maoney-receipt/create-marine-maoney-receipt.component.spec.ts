import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarineMaoneyReceiptComponent } from './create-marine-maoney-receipt.component';

describe('CreateMarineMaoneyReceiptComponent', () => {
  let component: CreateMarineMaoneyReceiptComponent;
  let fixture: ComponentFixture<CreateMarineMaoneyReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMarineMaoneyReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMarineMaoneyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
