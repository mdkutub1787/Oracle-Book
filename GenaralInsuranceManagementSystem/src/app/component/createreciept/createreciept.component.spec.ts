import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterecieptComponent } from './createreciept.component';

describe('CreaterecieptComponent', () => {
  let component: CreaterecieptComponent;
  let fixture: ComponentFixture<CreaterecieptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreaterecieptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaterecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
