import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeBrushComponent } from './resize-brush.component';

describe('ResizeBrushComponent', () => {
  let component: ResizeBrushComponent;
  let fixture: ComponentFixture<ResizeBrushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResizeBrushComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeBrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
