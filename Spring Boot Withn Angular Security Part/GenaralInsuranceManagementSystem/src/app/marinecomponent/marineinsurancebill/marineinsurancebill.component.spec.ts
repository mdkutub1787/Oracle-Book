import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineinsurancebillComponent } from './marineinsurancebill.component';

describe('MarineinsurancebillComponent', () => {
  let component: MarineinsurancebillComponent;
  let fixture: ComponentFixture<MarineinsurancebillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarineinsurancebillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarineinsurancebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
