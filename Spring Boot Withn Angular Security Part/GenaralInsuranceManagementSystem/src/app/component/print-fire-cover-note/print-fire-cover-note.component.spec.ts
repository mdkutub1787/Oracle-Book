import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFireCoverNoteComponent } from './print-fire-cover-note.component';

describe('PrintFireCoverNoteComponent', () => {
  let component: PrintFireCoverNoteComponent;
  let fixture: ComponentFixture<PrintFireCoverNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintFireCoverNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintFireCoverNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
