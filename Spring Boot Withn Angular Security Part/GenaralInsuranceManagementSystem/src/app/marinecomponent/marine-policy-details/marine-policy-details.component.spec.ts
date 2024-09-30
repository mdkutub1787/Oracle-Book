import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarinePolicyDetailsComponent } from './marine-policy-details.component';

describe('MarinePolicyDetailsComponent', () => {
  let component: MarinePolicyDetailsComponent;
  let fixture: ComponentFixture<MarinePolicyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarinePolicyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarinePolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
