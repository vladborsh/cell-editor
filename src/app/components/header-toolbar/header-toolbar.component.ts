import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  public isBackShown$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.username$ = this.authService.getUserName();
    this.isBackShown$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url !== '/'),
    );
  }

  back(): void {
    this.location.back();
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
