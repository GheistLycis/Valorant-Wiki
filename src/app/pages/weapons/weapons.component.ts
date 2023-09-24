import { Component } from '@angular/core';
import { WeaponService } from '@services/weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent {
  weapons$ = this.weaponService.list()

  constructor(private weaponService: WeaponService) {}
}
