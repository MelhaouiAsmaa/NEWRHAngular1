import { TestBed } from '@angular/core/testing';

import { SocieteService } from './societe.service';

describe('SocieteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocieteService = TestBed.get(SocieteService);
    expect(service).toBeTruthy();
  });
});
