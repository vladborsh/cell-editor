import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResizeBrushComponent } from './resize-brush.component';

describe('ResizeBrushComponent', () => {
  let component: ResizeBrushComponent;
  let fixture: ComponentFixture<ResizeBrushComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResizeBrushComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeBrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
