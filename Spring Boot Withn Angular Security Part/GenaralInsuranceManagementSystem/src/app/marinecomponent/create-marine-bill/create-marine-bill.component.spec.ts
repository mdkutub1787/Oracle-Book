import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarineBillComponent } from './create-marine-bill.component';

describe('CreateMarineBillComponent', () => {
  let component: CreateMarineBillComponent;
  let fixture: ComponentFixture<CreateMarineBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMarineBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMarineBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
