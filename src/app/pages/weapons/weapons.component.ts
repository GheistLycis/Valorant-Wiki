import { Component } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponData } from '@interfaces/WeaponData';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '@services/storage.service';
import { WeaponService } from '@services/weapon.service';
import { Observable, map, tap, of, iif, catchError } from 'rxjs';


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
    private carousel: NgbCarouselConfig,
  ) {
    const getWeaponMedia$ = (path: string) => this.weaponService.getMedia(path).pipe(
      tap(img => this.storageService.setItem(path, img)),
    )

    this.carousel.interval = 0
    this.carousel.showNavigationIndicators = false
    
    this.weaponsData$ = this.weaponService.list().pipe(
      map(weapons => weapons.map(weapon => {
          const obj: WeaponData = { weapon, skins: [] }
    
          weapon.skins.forEach(({ displayName, displayIcon }) => obj.skins.push({
              name: displayName, 
              src$: iif(
                  () => !this.storageService.getItem(displayIcon),
                  getWeaponMedia$(displayIcon),
                  of(this.storageService.getItem<string>(displayIcon)!).pipe(
                    catchError(() => getWeaponMedia$(displayIcon)) // not catching localStorage fetching error (ERR_FILE_NOT_FOUND)
                  ),
                )
            })
          )
          
          return obj
        }
      )),
    )
  }

  addToComparison(weaponId: Weapon['uuid']): void {

  }
}
