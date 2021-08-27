import { TestBed } from '@angular/core/testing';

import { CursorListenerService } from './cursor-listener.service';

describe('CursorListenerService', () => {
  let service: CursorListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursorListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
