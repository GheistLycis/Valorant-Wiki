import { Component, WritableSignal } from '@angular/core';
import { Weapon } from '@interfaces/weapon.interface';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { WeaponService } from '@services/weapon.service';


@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent {
  $weapons!: WritableSignal<Weapon[] | undefined>

  constructor(
    public weaponService: WeaponService,
    private carousel: NgbCarouselConfig,
  ) {
    carousel.interval = 0
    carousel.showNavigationIndicators = false
  
    this.$weapons = weaponService.$filteredWeapons
  }

  trackByFn(i: number, weapon: Weapon): string {
    return weapon.uuid
  }
}
