import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineinsurancedetailsComponent } from './marineinsurancedetails.component';

describe('MarineinsurancedetailsComponent', () => {
  let component: MarineinsurancedetailsComponent;
  let fixture: ComponentFixture<MarineinsurancedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarineinsurancedetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarineinsurancedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
