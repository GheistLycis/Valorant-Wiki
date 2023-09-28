import { Component } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponData } from '@interfaces/WeaponData';
import { StorageService } from '@services/storage.service';
import { WeaponService } from '@services/weapon.service';
import { Observable, map, iif, of } from 'rxjs';


@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent {
  weaponsData$!: Observable<WeaponData[]>

  constructor(
    private weaponService: WeaponService,
    private storageService: StorageService,
  ) {
    const getWeaponsData$ = this.weaponService.list().pipe(
      map(weapons => this.formmatWeaponsData(weapons))
    )
    const getCachedWeaponsData$ = of(this.storageService.getWeaponsData() as WeaponData[]).pipe(
      map(weapons => this.formmatWeaponsData(weapons))
    )

    this.weaponsData$ = iif(
      () => this.storageService.getWeaponsData() == null,
      getWeaponsData$,
      getCachedWeaponsData$,
    )
  }

  formmatWeaponsData(weapons: Weapon[]): WeaponData[] {
    return weapons.map(weapon => {
      const obj: WeaponData = { weapon, skins: [] }

      weapon.skins.forEach(({ displayName, displayIcon }) => obj.skins.push({ 
        name: displayName, 
        src$: this.weaponService.getMedia(displayIcon)
      }))
      return obj
    })
  }
}
