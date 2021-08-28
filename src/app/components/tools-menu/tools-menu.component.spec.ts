import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolsMenuComponent } from './tools-menu.component';

describe('ToolsMenuComponent', () => {
  let component: ToolsMenuComponent;
  let fixture: ComponentFixture<ToolsMenuComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ToolsMenuComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
