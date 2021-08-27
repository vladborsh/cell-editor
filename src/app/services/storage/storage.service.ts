import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storageKey = 'storage-cache-key';

  public addToStorage<T>(state: T): void {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  public pullFromStorage<T>(): T {
    return JSON.parse(localStorage.getItem(this.storageKey));
  }

  public isEmpty(): boolean {
    return !localStorage.getItem(this.storageKey);
  }
}
