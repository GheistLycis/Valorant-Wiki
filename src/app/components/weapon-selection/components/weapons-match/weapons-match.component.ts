import { Component } from '@angular/core';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { WeaponService } from '@services/weapon.service';

@Component({
  selector: 'app-weapons-match',
  templateUrl: './weapons-match.component.html',
  styleUrls: ['./weapons-match.component.scss']
})
export class WeaponsMatchComponent {
  $weapons = this.weaponService.$selectedWeapons

  constructor(
    public weaponService: WeaponService,
    private navConfig: NgbNavConfig
  ) {
    this.navConfig.animation = true
  }
}
