import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getItem<T = string>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key) || 'null')
  }

  setItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data))
  }
}
