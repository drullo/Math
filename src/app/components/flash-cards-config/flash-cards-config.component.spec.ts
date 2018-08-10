import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardsConfigComponent } from '@components/flash-cards-config/flash-cards-config.component';

describe('FlashCardsConfigComponent', () => {
  let component: FlashCardsConfigComponent;
  let fixture: ComponentFixture<FlashCardsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashCardsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashCardsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
