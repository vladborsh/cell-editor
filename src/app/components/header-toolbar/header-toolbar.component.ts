import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderToolbarComponent implements OnInit {
  public username$: Observable<string>;

  constructor(private angularFireAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.username$ = this.angularFireAuth.user.pipe(
      filter(Boolean),
      map((user: User) => user.displayName),
    );
  }

  login() {
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.signOut();
  }
}
