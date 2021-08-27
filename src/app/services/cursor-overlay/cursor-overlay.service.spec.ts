import { TestBed } from '@angular/core/testing';

import { CursorOverlayService } from './cursor-overlay.service';

describe('CursorOverlayService', () => {
  let service: CursorOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursorOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
