import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemoneyreceiptComponent } from './createmoneyreceipt.component';

describe('CreatemoneyreceiptComponent', () => {
  let component: CreatemoneyreceiptComponent;
  let fixture: ComponentFixture<CreatemoneyreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatemoneyreceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatemoneyreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
