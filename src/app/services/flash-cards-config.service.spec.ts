import { TestBed, inject } from '@angular/core/testing';

import { FlashCardsConfigService } from '@services/flash-cards-config.service';

describe('FlashCardsConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashCardsConfigService]
    });
  });

  it('should be created', inject([FlashCardsConfigService], (service: FlashCardsConfigService) => {
    expect(service).toBeTruthy();
  }));
});
