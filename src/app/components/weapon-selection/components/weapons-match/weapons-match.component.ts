import { Component, WritableSignal } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponService } from '@services/weapon.service';

@Component({
  selector: 'app-weapons-match',
  templateUrl: './weapons-match.component.html',
  styleUrls: ['./weapons-match.component.scss']
})
export class WeaponsMatchComponent {
  $weapons!: WritableSignal<Weapon[]>
  active = 0

  constructor(public weaponService: WeaponService) {
    this.$weapons = this.weaponService.$selectedWeapons
  }
}
