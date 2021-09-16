import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceCardListComponent } from './workspace-card-list.component';

describe('WorkspaceCardListComponent', () => {
  let component: WorkspaceCardListComponent;
  let fixture: ComponentFixture<WorkspaceCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceCardListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
