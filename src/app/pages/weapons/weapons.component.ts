import { Component } from '@angular/core';
import { WeaponData } from '@interfaces/WeaponData';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '@services/storage.service';
import { WeaponService } from '@services/weapon.service';
import { Observable, map, tap, of, iif } from 'rxjs';


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
    this.carousel.interval = 0
    this.carousel.showNavigationIndicators = false

    this.weaponsData$ = this.weaponService.list().pipe(
      map(weapons => weapons.map(weapon => {
          const obj: WeaponData = { weapon, skins: [] }
    
          weapon.skins.forEach(({ displayName, displayIcon }) => obj.skins.push({
              name: displayName, 
              src$: iif(
                  () => !this.storageService.getItem(displayIcon),
                  this.weaponService.getMedia(displayIcon).pipe(
                    tap(img => this.storageService.setItem(displayIcon, img)),
                  ),
                  of(this.storageService.getItem<string>(displayIcon)!),
                )
            })
          )
          
          return obj
        }
      )),
    )
  }
}
