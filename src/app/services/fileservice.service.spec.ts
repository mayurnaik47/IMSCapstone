import { TestBed } from '@angular/core/testing';

import { FileserviceService } from './fileservice.service';

describe('FileserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileserviceService = TestBed.get(FileserviceService);
    expect(service).toBeTruthy();
  });
});
