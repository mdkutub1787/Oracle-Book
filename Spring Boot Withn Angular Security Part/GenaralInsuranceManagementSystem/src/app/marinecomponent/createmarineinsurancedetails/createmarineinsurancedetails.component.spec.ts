import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemarineinsurancedetailsComponent } from './createmarineinsurancedetails.component';

describe('CreatemarineinsurancedetailsComponent', () => {
  let component: CreatemarineinsurancedetailsComponent;
  let fixture: ComponentFixture<CreatemarineinsurancedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatemarineinsurancedetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatemarineinsurancedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
