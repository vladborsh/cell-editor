import { TestBed } from '@angular/core/testing';

import { LineToolService } from './line-tool.service';

describe('LineToolService', () => {
  let service: LineToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
