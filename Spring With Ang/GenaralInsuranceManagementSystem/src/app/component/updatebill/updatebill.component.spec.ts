import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebillComponent } from './updatebill.component';

describe('UpdatebillComponent', () => {
  let component: UpdatebillComponent;
  let fixture: ComponentFixture<UpdatebillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatebillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
