import { TestBed } from '@angular/core/testing';

import { BresenhamEllipseAlgorithmService } from './bresenham-ellipse-algorithm.service';

describe('BresenhamEllipseAlgorithmService', () => {
  let service: BresenhamEllipseAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BresenhamEllipseAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
