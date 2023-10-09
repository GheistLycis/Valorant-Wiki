import { Component } from '@angular/core';
import { Weapon } from '@interfaces/weapon.interface';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { WeaponService } from '@services/weapon.service';


@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent {

  constructor(
    public weaponService: WeaponService,
    private carousel: NgbCarouselConfig,
  ) {
    carousel.interval = 0
    carousel.showNavigationIndicators = false
  }

  trackByFn(i: number, weapon: Weapon): string {
    return weapon.uuid
  }
}
