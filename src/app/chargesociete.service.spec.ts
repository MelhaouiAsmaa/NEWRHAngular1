import { TestBed } from '@angular/core/testing';

import { ChargesocieteService } from './chargesociete.service';

describe('ChargesocieteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargesocieteService = TestBed.get(ChargesocieteService);
    expect(service).toBeTruthy();
  });
});
