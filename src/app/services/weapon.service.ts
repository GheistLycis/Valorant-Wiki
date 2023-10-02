import { Injectable, signal } from '@angular/core';
import { apiLangs } from '../types/apiLangs';
import { Weapon } from '@interfaces/Weapon';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  endpoint = 'weapons'
  $selectedWeapons = signal<Weapon[]>([])

  constructor(private api: ApiService) {}

  get(id: string, language?: apiLangs) {
    return this.api.get<Weapon>(this.endpoint, id, language)
  }

  list(language?: apiLangs) {
    return this.api.list<Weapon>(this.endpoint, language)
  }

  getMedia(path: string) {
    return this.api.getMedia(path)
  }

  addToSelection(weapon: Weapon): void {
    if(!this.$selectedWeapons().includes(weapon)) {
      this.$selectedWeapons.update(weapons => {
        weapons.push(weapon)
        return weapons
      })
    }
    else {
      this.removeFromSelection(weapon)
    }
  }

  removeFromSelection({ uuid }: Weapon): void {
    this.$selectedWeapons.update(weapons => weapons.filter(weapon => weapon.uuid != uuid))
  }

  clearSelection(): void {
    this.$selectedWeapons.set([])
  }
}
