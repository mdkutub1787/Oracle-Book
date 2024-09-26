import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebillComponent } from './createbill.component';

describe('CreatebillComponent', () => {
  let component: CreatebillComponent;
  let fixture: ComponentFixture<CreatebillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatebillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
