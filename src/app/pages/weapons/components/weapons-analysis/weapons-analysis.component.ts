import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponService } from '@services/weapon.service';


type advantage = { title: string, detail: string }

@Component({
  selector: 'app-weapons-analysis',
  templateUrl: './weapons-analysis.component.html',
  styleUrls: ['./weapons-analysis.component.scss']
})
export class WeaponsAnalysisComponent {
  $weapons!: WritableSignal<Weapon[]>
  $selectedWeapon!: WritableSignal<Weapon>
  $advantages!: Signal<advantage[]>

  constructor(public weaponService: WeaponService) {
    this.$weapons = weaponService.$selectedWeapons
    this.$selectedWeapon = signal(this.$weapons()[0])
    this.$advantages = computed(() => this.getAdvantages())
  }

  getAdvantages(): advantage[] {
    const advantages: advantage[] = []
    const selected = this.$selectedWeapon()
    const others = this.$weapons().filter(({ uuid }) => uuid != selected.uuid)
    
    this.checkSkinsNumber(selected, others, advantages)

    return advantages
  }

  checkSkinsNumber(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'More skins available', detail: '' }
    const selectedSkins = selected.skins.length
    const othersSkins = others.map(({ displayName, skins }) => ({ weapon: displayName, number: skins.length }))

    othersSkins.forEach(({ weapon, number }) => {
      if(selectedSkins > number) {
        if(!advantage.detail) advantage.detail = `<b>${selectedSkins}</b>`
        
        advantage.detail += ` vs <b>${number} (${weapon})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }
}
