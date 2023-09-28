import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem<T = string>(key: string): T | null {
    const item = localStorage.getItem(key) || 'null'

    return JSON.parse(item)
  }

  setItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data))
  }
}
