import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDataDialogComponent } from './score-data-dialog.component';

describe('ScoreDataDialogComponent', () => {
  let component: ScoreDataDialogComponent;
  let fixture: ComponentFixture<ScoreDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
