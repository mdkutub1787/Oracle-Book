import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarineBillComponent } from './update-marine-bill.component';

describe('UpdateMarineBillComponent', () => {
  let component: UpdateMarineBillComponent;
  let fixture: ComponentFixture<UpdateMarineBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateMarineBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMarineBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
