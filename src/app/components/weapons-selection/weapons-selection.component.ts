import { Component, computed, signal } from '@angular/core';
import { WeaponService } from '@services/weapon.service';

@Component({
  selector: 'app-weapons-selection',
  templateUrl: './weapons-selection.component.html',
  styleUrls: ['./weapons-selection.component.scss']
})
export class WeaponsSelectionComponent {
  $weapons = this.weaponService.$selectedWeapons
  $minSelections = computed(() => this.$weapons().length >= 2)
  $expand = signal(false)
  $expanded = computed(() => this.$expand() && this.$minSelections())

  constructor(public weaponService: WeaponService) {}
}
