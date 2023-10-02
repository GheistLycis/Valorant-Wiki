import { Component, WritableSignal } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponService } from '@services/weapon.service';

@Component({
  selector: 'app-weapons-selection',
  templateUrl: './weapons-selection.component.html',
  styleUrls: ['./weapons-selection.component.scss']
})
export class WeaponsSelectionComponent {
  $weapons!: WritableSignal<Weapon[]>
  expanded = false

  constructor(
    private weaponService: WeaponService,
  ) {
    this.$weapons = this.weaponService.$selectedWeapons
  }

  removeFromSelection({ uuid }: Weapon): void {
    this.$weapons.update(weapons => weapons.filter(weapon => weapon.uuid != uuid))
  }

  clearList(): void {
    this.$weapons.update(weapons => weapons = [])
  }
}
