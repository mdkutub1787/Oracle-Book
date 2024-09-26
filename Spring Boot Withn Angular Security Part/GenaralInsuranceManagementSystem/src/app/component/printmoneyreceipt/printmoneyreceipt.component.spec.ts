import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintmoneyreceiptComponent } from './printmoneyreceipt.component';

describe('PrintmoneyreceiptComponent', () => {
  let component: PrintmoneyreceiptComponent;
  let fixture: ComponentFixture<PrintmoneyreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintmoneyreceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintmoneyreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
