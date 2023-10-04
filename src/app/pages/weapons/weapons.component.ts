import { Component, WritableSignal } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { WeaponService } from '@services/weapon.service';


@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent {
  $weapons!: WritableSignal<Weapon[]>

  constructor(
    public weaponService: WeaponService,
    private carousel: NgbCarouselConfig,
  ) {
    this.carousel.interval = 0
    this.carousel.showNavigationIndicators = false
  
    this.$weapons = this.weaponService.$filteredWeapons
  }

  trackByFn(i: number, weapon: Weapon): string {
    return weapon.uuid
  }
}
