import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMarineCoverNoteComponent } from './print-marine-cover-note.component';

describe('PrintMarineCoverNoteComponent', () => {
  let component: PrintMarineCoverNoteComponent;
  let fixture: ComponentFixture<PrintMarineCoverNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintMarineCoverNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintMarineCoverNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
