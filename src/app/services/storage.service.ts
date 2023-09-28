import { Injectable } from '@angular/core';
import { WeaponData } from '@interfaces/WeaponData';

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

  getWeaponsData(): WeaponData[] | null {
    return this.getItem<WeaponData[]>('weaponsData')
  }

  setWeaponsData(data: WeaponData[]): void {
    this.setItem('weaponsData', data)
  }
}
