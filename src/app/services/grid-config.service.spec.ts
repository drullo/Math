import { TestBed, inject } from '@angular/core/testing';

import { GridConfigService } from './grid-config.service';

describe('GridConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridConfigService]
    });
  });

  it('should be created', inject([GridConfigService], (service: GridConfigService) => {
    expect(service).toBeTruthy();
  }));
});
