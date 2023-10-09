import { Injectable, WritableSignal, signal } from '@angular/core';
import { apiLangs } from '../types/api-langs.type';
import { Weapon } from '@interfaces/weapon.interface';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, iif, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  apiEndpoint!: string
  cachedWeapons!: Weapon[]
  $selectedWeapons!: WritableSignal<Weapon[]>
  filteredWeapons$!: BehaviorSubject<Weapon[]>

  constructor(private api: ApiService) {
    this.apiEndpoint = 'weapons'
    this.cachedWeapons = []
    this.$selectedWeapons = signal([])
    this.filteredWeapons$ = new BehaviorSubject([] as Weapon[])
  }

  get(id: string, caching = true, language?: apiLangs): Observable<Weapon> {
    return iif(
      () => caching && this.cachedWeapons.length > 0,
      of(this.cachedWeapons.find(({ uuid }) => uuid == id)!),
      this.api.get<Weapon>(this.apiEndpoint, id, language)
    )
  }

  list(caching = true, language?: apiLangs): Observable<Weapon[]> {
    return iif(
      () => caching && this.cachedWeapons.length > 0,
      of(this.cachedWeapons),
      this.api.list<Weapon>(this.apiEndpoint, language).pipe(
        tap(weapons => this.cachedWeapons = weapons),
      )
    )
  }

  getMedia(path: string): Observable<string> {
    return this.api.getMedia(path)
  }

  addToSelection(weapon: Weapon): void {
    if(weapon.displayName != 'Melee') {
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
  }

  removeFromSelection({ uuid }: Weapon): void {
    this.$selectedWeapons.update(weapons => weapons.filter(weapon => weapon.uuid != uuid))
  }

  clearSelection(): void {
    this.$selectedWeapons.set([])
  }
}
