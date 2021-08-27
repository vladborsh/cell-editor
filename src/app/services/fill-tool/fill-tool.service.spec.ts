import { TestBed } from '@angular/core/testing';

import { FillToolService } from './fill-tool.service';

describe('FillToolService', () => {
  let service: FillToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
