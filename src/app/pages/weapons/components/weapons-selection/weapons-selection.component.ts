import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Weapon } from '@interfaces/weapon.interface';
import { WeaponService } from '@services/weapon.service';

@Component({
  selector: 'app-weapons-selection',
  templateUrl: './weapons-selection.component.html',
  styleUrls: ['./weapons-selection.component.scss']
})
export class WeaponsSelectionComponent {
  $expand!: WritableSignal<boolean>
  $weapons!: WritableSignal<Weapon[]>
  $minSelections!: Signal<boolean>
  $expanded!: Signal<boolean>

  constructor(public weaponService: WeaponService) {
    this.$expand = signal(false)
    this.$weapons = weaponService.$selectedWeapons
    this.$minSelections = computed(() => this.$weapons().length >= 2)
    this.$expanded = computed(() => this.$expand() && this.$minSelections())
  }
}
