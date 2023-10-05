import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { WeaponService } from '@services/weapon.service';


@Component({
  selector: 'app-weapons-analysis',
  templateUrl: './weapons-analysis.component.html',
  styleUrls: ['./weapons-analysis.component.scss']
})
export class WeaponsAnalysisComponent {
  $weapons!: WritableSignal<Weapon[]>
  $selectedWeapon!: WritableSignal<Weapon>
  $advantages!: Signal<string[]>

  constructor(
    public weaponService: WeaponService,
    private navConfig: NgbNavConfig,
  ) {
    navConfig.animation = true

    this.$weapons = weaponService.$selectedWeapons
    this.$selectedWeapon = signal(this.$weapons()[0])
    this.$advantages = computed(() => {
      return Array(200).fill('test')
    })
  }
}
