import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarineListComponent } from './create-marine-list.component';

describe('CreateMarineListComponent', () => {
  let component: CreateMarineListComponent;
  let fixture: ComponentFixture<CreateMarineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMarineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMarineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
