import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridConfigComponent } from '@components/grid-config/grid-config.component';

describe('GridConfigComponent', () => {
  let component: GridConfigComponent;
  let fixture: ComponentFixture<GridConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
