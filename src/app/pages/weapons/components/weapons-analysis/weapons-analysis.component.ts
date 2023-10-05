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
    
    this.checkEffectiveRange(selected, others, advantages)
    this.checkWallPenetration(selected, others, advantages)
    this.checkFirstBulletAcc(selected, others, advantages)
    this.checkReloadTime(selected, others, advantages)
    this.checkEquipTime(selected, others, advantages)
    this.checkRunSpeedMultiplier(selected, others, advantages)
    this.checkMagazineSize(selected, others, advantages)
    this.checkFireRate(selected, others, advantages)
    this.checkCost(selected, others, advantages)
    this.checkSkinsNumber(selected, others, advantages)

    return advantages
  }

  checkEffectiveRange(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'Greater effective range', detail: '' }
    const selectedData = selected.weaponStats!.damageRanges[0].rangeEndMeters
    const othersData = others.map(({ displayName, weaponStats }) => ({ displayName, data: weaponStats!.damageRanges[0].rangeEndMeters }))

    othersData.forEach(({ displayName, data }) => {
      if(selectedData > data ) {
        if(!advantage.detail) advantage.detail = `<b>${selectedData}m</b>`
        
        advantage.detail += ` vs <b>${data}m (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }

  checkWallPenetration(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const rules = ['Low', 'Medium', 'High'] as const
    const advantage = { title: 'Better wall penetration', detail: '' }
    const selectedData = selected.weaponStats!.wallPenetration.replace('EWallPenetrationDisplayType::', '') as typeof rules[number]
    const othersData = others.map(({ displayName, weaponStats }) => ({ displayName, data: weaponStats!.wallPenetration.replace('EWallPenetrationDisplayType::', '') as typeof rules[number] }))

    othersData.forEach(({ displayName, data }) => {
      if(rules.indexOf(selectedData) > rules.indexOf(data)) {
        if(!advantage.detail) advantage.detail = `<b>${selectedData}</b>`
        
        advantage.detail += ` vs <b>${data} (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }

  checkFirstBulletAcc(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'Better 1st bullet accuracy', detail: '' }
    const selectedData = selected.weaponStats!.firstBulletAccuracy
    const othersData = others.map(({ displayName, weaponStats }) => ({ displayName, data: weaponStats!.firstBulletAccuracy }))

    othersData.forEach(({ displayName, data }) => {
      if(selectedData > data) {
        if(!advantage.detail) advantage.detail = `<b>${selectedData.toFixed(2)}%</b>`
        
        advantage.detail += ` vs <b>${data.toFixed(2)}% (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }

  checkReloadTime(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'Faster to reload', detail: '' }
    const selectedData = selected.weaponStats!.reloadTimeSeconds
    const othersData = others.map(({ displayName, weaponStats }) => ({ displayName, data: weaponStats!.reloadTimeSeconds }))

    othersData.forEach(({ displayName, data }) => {
      if(selectedData < data) {
        if(!advantage.detail) advantage.detail = `<b>${selectedData.toFixed(1)}s</b>`
        
        advantage.detail += ` vs <b>${data.toFixed(1)}s (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }

  checkEquipTime(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'Faster to equip', detail: '' }
    const selectedData = selected.weaponStats!.equipTimeSeconds
    const othersData = others.map(({ displayName, weaponStats }) => ({ displayName, data: weaponStats!.equipTimeSeconds }))

    othersData.forEach(({ displayName, data }) => {
      if(selectedData < data) {
        if(!advantage.detail) advantage.detail = `<b>${selectedData.toFixed(1)}s</b>`
        
        advantage.detail += ` vs <b>${data.toFixed(1)}s (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }

  checkRunSpeedMultiplier(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'More run speed multiplier', detail: '' }
    const selectedData = selected.weaponStats!.runSpeedMultiplier
    const othersData = others.map(({ displayName, weaponStats }) => ({ displayName, data: weaponStats!.runSpeedMultiplier }))

    othersData.forEach(({ displayName, data }) => {
      if(selectedData > data) {
        if(!advantage.detail) advantage.detail = `<b>x${selectedData.toFixed(2)}</b>`
        
        advantage.detail += ` vs <b>x${data.toFixed(2)} (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }

  checkMagazineSize(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'More rounds per clip', detail: '' }
    const selectedData = selected.weaponStats!.magazineSize
    const othersData = others.map(({ displayName, weaponStats }) => ({ displayName, data: weaponStats!.magazineSize }))

    othersData.forEach(({ displayName, data }) => {
      if(selectedData > data) {
        if(!advantage.detail) advantage.detail = `<b>${selectedData}</b>`
        
        advantage.detail += ` vs <b>${data} (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }

  checkFireRate(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'More fire rate', detail: '' }
    const selectedData = selected.weaponStats!.fireRate
    const othersData = others.map(({ displayName, weaponStats }) => ({ displayName, data: weaponStats!.fireRate }))

    othersData.forEach(({ displayName, data }) => {
      if(selectedData > data) {
        if(!advantage.detail) advantage.detail = `<b>${selectedData.toFixed(1)}/s</b>`
        
        advantage.detail += ` vs <b>${data.toFixed(1)}/s (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }

  checkCost(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'Cheaper', detail: '' }
    const selectedData = selected.shopData!.cost
    const othersData = others.map(({ displayName, shopData }) => ({ displayName, data: shopData!.cost }))

    othersData.forEach(({ displayName, data }) => {
      if(selectedData < data) {
        if(!advantage.detail) advantage.detail = `<b>$${selectedData}</b>`
        
        advantage.detail += ` vs <b>$${data} (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }

  checkSkinsNumber(selected: Weapon, others: Weapon[], list: advantage[]): void {
    const advantage = { title: 'More skins available', detail: '' }
    const selectedData = selected.skins.length
    const othersData = others.map(({ displayName, skins }) => ({ displayName, data: skins.length }))

    othersData.forEach(({ displayName, data }) => {
      if(selectedData > data) {
        if(!advantage.detail) advantage.detail = `<b>${selectedData}</b>`
        
        advantage.detail += ` vs <b>${data} (${displayName})</b>`
      }
    })

    if(advantage.detail) list.push(advantage)
  }
}
