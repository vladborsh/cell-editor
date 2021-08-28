import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResizeGridComponent } from './resize-grid.component';

describe('ResizeGridComponent', () => {
  let component: ResizeGridComponent;
  let fixture: ComponentFixture<ResizeGridComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResizeGridComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
