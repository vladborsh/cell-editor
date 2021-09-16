import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Workspace } from 'src/app/interfaces/workspace.interface';

import { AuthService } from '../auth/auth.service';

const WORKSPACE_COLLECTION_NAME = 'workspace';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private collection$ = this.authService
    .getUserId()
    .pipe(
      map((uid: string) => this.database.list<Workspace>(`${WORKSPACE_COLLECTION_NAME}/${uid}`)),
    );

  constructor(private database: AngularFireDatabase, private authService: AuthService) {}

  getItemList$(): Observable<Workspace[]> {
    return this.collection$.pipe(
      switchMap(collection => collection.snapshotChanges()),
      map((items: SnapshotAction<Workspace>[]) =>
        items.map(action => ({ id: action.key, ...action.payload.val() })),
      ),
    );
  }

  create(baseWorkspace: Workspace): void {
    combineLatest([
      this.collection$.pipe(take(1)),
      this.enrichCreatePayload(baseWorkspace),
    ]).subscribe(([collection, workspace]) => collection.push(workspace));
  }

  remove(id: string): void {
    this.collection$.pipe(take(1)).subscribe(collection => {
      collection.remove(id);
    });
  }

  private enrichCreatePayload(workspace: Workspace): Observable<Workspace> {
    return combineLatest([this.authService.getUserId(), this.authService.getUserName()]).pipe(
      take(1),
      map(([userId, userName]) => ({
        ...workspace,
        createdDate: Date.now(),
        createdBy: userId,
        createdByName: userName,
        lastModifiedDate: Date.now(),
        lastModifiedBy: userId,
        lastModifiedByName: userName,
        views: 0,
      })),
    );
  }
}