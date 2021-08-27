import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeGridComponent } from './resize-grid.component';

describe('ResizeGridComponent', () => {
  let component: ResizeGridComponent;
  let fixture: ComponentFixture<ResizeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResizeGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
