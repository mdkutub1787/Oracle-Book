import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineinsurancebillDetailsComponent } from './marineinsurancebill-details.component';

describe('MarineinsurancebillDetailsComponent', () => {
  let component: MarineinsurancebillDetailsComponent;
  let fixture: ComponentFixture<MarineinsurancebillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarineinsurancebillDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarineinsurancebillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
