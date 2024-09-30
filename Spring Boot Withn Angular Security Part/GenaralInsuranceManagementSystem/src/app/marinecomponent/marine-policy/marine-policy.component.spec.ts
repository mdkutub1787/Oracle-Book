import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarinePolicyComponent } from './marine-policy.component';

describe('MarinePolicyComponent', () => {
  let component: MarinePolicyComponent;
  let fixture: ComponentFixture<MarinePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarinePolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarinePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
