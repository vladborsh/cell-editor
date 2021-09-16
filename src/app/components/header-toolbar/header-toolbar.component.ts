import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

import { NewWorkspaceComponent } from '../new-workspace/new-workspace.component';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderToolbarComponent implements OnInit {
  public username$: Observable<string>;

  constructor(private authService: AuthService, public matDialog: MatDialog) {}

  ngOnInit(): void {
    this.username$ = this.authService.getUserName();
  }

  createNew(): void {
    this.matDialog.open(NewWorkspaceComponent);
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
