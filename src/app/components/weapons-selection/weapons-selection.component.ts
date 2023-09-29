import { Component, WritableSignal } from '@angular/core';
import { Spray } from '@interfaces/Spray';
import { Weapon } from '@interfaces/Weapon';
import { SprayService } from '@services/spray.service';
import { WeaponService } from '@services/weapon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weapons-selection',
  templateUrl: './weapons-selection.component.html',
  styleUrls: ['./weapons-selection.component.scss']
})
export class WeaponsSelectionComponent {
  $weapons!: WritableSignal<Weapon[]>
  compareIcon$!: Observable<Spray>

  constructor(
    private weaponService: WeaponService,
    private sprayService: SprayService,
  ) {
    this.$weapons = this.weaponService.$selectedWeapons
    this.compareIcon$ = this.sprayService.get('8d8179b0-449a-6856-857e-dc97de7b2ace')
  }

  removeFromSelection({ uuid }: Weapon): void {
    this.$weapons.update(weapons => weapons.filter(weapon => weapon.uuid != uuid))
  }
}
