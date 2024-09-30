import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarinePolicyComponent } from './create-marine-policy.component';

describe('CreateMarinePolicyComponent', () => {
  let component: CreateMarinePolicyComponent;
  let fixture: ComponentFixture<CreateMarinePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMarinePolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMarinePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
