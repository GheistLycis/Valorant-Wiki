import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { palette } from '@enums/palette';
import { Weapon } from '@interfaces/Weapon';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { WeaponService } from '@services/weapon.service';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';



@Component({
  selector: 'app-weapons-analysis',
  templateUrl: './weapons-analysis.component.html',
  styleUrls: ['./weapons-analysis.component.scss']
})
export class WeaponsAnalysisComponent {
  $weapons!: WritableSignal<Weapon[]>
  $selectedWeapon!: WritableSignal<Weapon['uuid']>
  $data!: Signal<ChartData<'radar', number[], string>>
  options!: ChartOptions<'radar'>

  constructor(
    public weaponService: WeaponService,
    private navConfig: NgbNavConfig
  ) {
    navConfig.animation = true

    this.$weapons = weaponService.$selectedWeapons

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
      datasets: this.$weapons().map(({ displayName, weaponStats, uuid }) => {
        const { damageRanges, magazineSize, fireRate, reloadTimeSeconds, equipTimeSeconds } = weaponStats!
        const dataset: ChartDataset<'radar', number[]> = {
          label: displayName,
          data: [
            (damageRanges.reduce((acc, { headDamage }) => acc += headDamage, 0)) / (damageRanges.length),
            (damageRanges.reduce((acc, { bodyDamage }) => acc += bodyDamage, 0)) / (damageRanges.length),
            (damageRanges.reduce((acc, { legDamage }) => acc += legDamage, 0)) / (damageRanges.length),
            magazineSize,
            fireRate,
            damageRanges.reduce((acc, { rangeEndMeters }) => acc = Math.max(rangeEndMeters, acc), 0),
            reloadTimeSeconds,
            equipTimeSeconds,
          ],
          fill: true,
          order: uuid == this.$selectedWeapon() ? 0 : 1,
        }

        return dataset
      })
    }))

    this.options = {
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
  }
}
