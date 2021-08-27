import { TestBed } from '@angular/core/testing';

import { BresenhamLineAlgorithmService } from './bresenham-line-algorithm.service';

describe('BresenhamLineAlgorithmService', () => {
  let service: BresenhamLineAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BresenhamLineAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
