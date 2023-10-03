import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { palette } from '@enums/palette';
import { Weapon } from '@interfaces/Weapon';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { WeaponService } from '@services/weapon.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-weapons-match',
  templateUrl: './weapons-match.component.html',
  styleUrls: ['./weapons-match.component.scss']
})
export class WeaponsMatchComponent {
  $weapons!: WritableSignal<Weapon[]>
  $selectedWeapon!: WritableSignal<Weapon['uuid']>
  $data!: Signal<any>
  options: ChartConfiguration<'radar'>['options'] = {
    color: palette.black,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: ([ tooltip ]) => tooltip.dataset.label!.toUpperCase(),
          label: ({ parsed }) => parsed.r.toString(),
        },
        titleFont: {
          family: 'secondary',
          size: 20,
        },
        bodyFont: {
          family: 'secondary',
          size: 40,
          weight: '700',
        },
        boxHeight: 0,
        boxWidth: 0,
      },
    },
  }

  constructor(
    public weaponService: WeaponService,
    private navConfig: NgbNavConfig
  ) {
    this.navConfig.animation = true

    this.$weapons = this.weaponService.$selectedWeapons

    this.$selectedWeapon = signal(this.$weapons()[0].uuid)

    this.$data = computed(() => ({
      labels: [
        'AVG DMG Head',
        'AVG DMG Body',
        'AVG DMG Legs',
        'Magazine Size',
        'Fire Rate (/s)',
        'Range (m)',
        'Reload Time (s)',
        'Equip Time (s)',
      ],
      datasets: this.$weapons().map(({ displayName, weaponStats, uuid }) => ({
        label: displayName,
        data: [
          (weaponStats!.damageRanges.reduce((acc, { headDamage }) => acc += headDamage, 0)) / (weaponStats!.damageRanges.length),
          (weaponStats!.damageRanges.reduce((acc, { bodyDamage }) => acc += bodyDamage, 0)) / (weaponStats!.damageRanges.length),
          (weaponStats!.damageRanges.reduce((acc, { legDamage }) => acc += legDamage, 0)) / (weaponStats!.damageRanges.length),
          weaponStats!.magazineSize,
          weaponStats!.fireRate,
          weaponStats!.damageRanges.reduce((acc, { rangeEndMeters }) => acc = Math.max(rangeEndMeters, acc), 0),
          weaponStats!.reloadTimeSeconds,
          weaponStats!.equipTimeSeconds,
        ],
        fill: true,
        order: uuid == this.$selectedWeapon() ? 0 : 1,
      }))
    }))
  }
}
