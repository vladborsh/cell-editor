export class StorageService {
  readonly STORAGE_KEY = 'storage-cache-key';

  public addToStorage<T>(state: T): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  public pullFromStorage<T>(): T {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
  }

  public isEmpty(): boolean {
    return !localStorage.getItem(this.STORAGE_KEY);
  }
}
