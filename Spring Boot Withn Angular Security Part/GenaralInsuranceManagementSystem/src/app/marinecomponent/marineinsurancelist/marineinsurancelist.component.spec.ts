import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarineinsurancelistComponent } from './marineinsurancelist.component';

describe('MarineinsurancelistComponent', () => {
  let component: MarineinsurancelistComponent;
  let fixture: ComponentFixture<MarineinsurancelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarineinsurancelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarineinsurancelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
