import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtreatemarineinsurancebillComponent } from './ctreatemarineinsurancebill.component';

describe('CtreatemarineinsurancebillComponent', () => {
  let component: CtreatemarineinsurancebillComponent;
  let fixture: ComponentFixture<CtreatemarineinsurancebillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CtreatemarineinsurancebillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtreatemarineinsurancebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
