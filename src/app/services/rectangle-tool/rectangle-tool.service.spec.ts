import { TestBed } from '@angular/core/testing';

import { RectangleToolService } from './rectangle-tool.service';

describe('RectangleToolService', () => {
  let service: RectangleToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RectangleToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
