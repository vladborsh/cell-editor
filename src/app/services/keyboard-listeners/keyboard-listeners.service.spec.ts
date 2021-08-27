import { TestBed } from '@angular/core/testing';

import { KeyboardListenersService } from './keyboard-listeners.service';

describe('KeyboardListenersService', () => {
  let service: KeyboardListenersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardListenersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
