import { TestBed } from '@angular/core/testing';

import { EllipseToolService } from './ellipse-tool.service';

describe('EllipseToolService', () => {
  let service: EllipseToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EllipseToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
