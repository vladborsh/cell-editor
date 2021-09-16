import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  getUserName(): Observable<string> {
    return this.angularFireAuth.user.pipe(
      filter(Boolean),
      map((user: User) => user.displayName),
    );
  }

  getUserId(): Observable<string> {
    return this.angularFireAuth.user.pipe(
      filter(Boolean),
      map((user: User) => user.uid),
    );
  }

  login() {
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.signOut();
  }
}
