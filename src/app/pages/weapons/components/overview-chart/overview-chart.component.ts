import { Component, Input, OnChanges, Signal, SimpleChanges, WritableSignal, computed } from '@angular/core';
import { palette } from '@enums/palette';
import { Weapon } from '@interfaces/Weapon';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.scss']
})
export class OverviewChartComponent implements OnChanges {
  @Input('weapons') weapons!: Weapon[] | null
  @Input('selectedWeapons') $selectedWeapons!: WritableSignal<Weapon[]>
  @Input('selectedWeapon') $selectedWeapon!: WritableSignal<Weapon>
  $data!: Signal<ChartData<'radar', number[], string>>
  options!: ChartOptions<'radar'>

  constructor() {
    this.options = {
      elements: {
        line: {
          borderWidth: 3,
          tension: 0.3,
        },
        point: {
          borderWidth: 0,
        }
      },
      scales: {
        r: {
          grid: {
            circular: true,
            lineWidth: 2,
          },
          ticks: {
            backdropColor: 'transparent',
            color: 'rgba(0, 0, 0, 0.5)',
          },
          pointLabels: {
            color: palette['dark-gray'],
            font: {
              family: 'secondary',
              size: 15,
            }
          },
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: palette['dark-gray'],
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              family: 'secondary',
              size: 18,
            },
          },
        },
        tooltip: {
          callbacks: {
            title: ([ tooltip ]) => tooltip.dataset.label!.toUpperCase(),
            label: ({ parsed }) => parsed.r.toFixed(2) + ' pts',
          },
          titleFont: {
            family: 'secondary',
            size: 20,
          },
          bodyFont: {
            family: 'secondary',
            size: 30,
            weight: '700',
          },
          boxHeight: 0,
          boxWidth: 0,
        },
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const colors = [
      '200, 0, 0', // red
      '0, 200, 0', // green
      '0, 0, 200', // blue
      '200, 200, 0', // yellow
      '200, 0, 200', // purple
      '0, 200, 200', // cyan
    ]

    this.$data = computed(() => ({
      labels: [
        'Cost',
        'Magazine Size',
        'Fire Rate',
        'Reload Time',
        'Equip Time',
      ],
      datasets: this.$selectedWeapons().map(({ displayName, weaponStats, shopData, uuid }, i) => {
        const color = i < colors.length ? colors[i] : colors[i % colors.length]
        const dataset: ChartDataset<'radar', number[]> = {
          label: displayName,
          data: this.getScorePoints(weaponStats, shopData),
          order: uuid == this.$selectedWeapon().uuid ? 0 : 1,
          backgroundColor: `rgba(${color}, 0.8)`,
          borderColor: `rgba(${color}, 1)`,
          pointBackgroundColor: `rgba(${color}, 1)`,
        }

        return dataset
      })
    }))
  }

  getScorePoints(weaponStats: Weapon['weaponStats'], shopData: Weapon['shopData']): number[] {
    const weapons = this.weapons!.filter(({ category }) => !category.includes('Melee'))
    const { magazineSize, fireRate, reloadTimeSeconds, equipTimeSeconds } = weaponStats!
    const data = [
      shopData!.cost,
      magazineSize,
      fireRate,
      reloadTimeSeconds,
      equipTimeSeconds,
    ]

    const maxCost = weapons.reduce((acc, val) => acc = Math.max(acc, val.shopData!.cost), 0)
    data[0] = 100 - (data[0] * 100 / maxCost)

    const maxMagazineSize = weapons.reduce((acc, val) => acc = Math.max(acc, val.weaponStats!.magazineSize), 0)
    data[1] = (data[1] * 100 / maxMagazineSize)

    const maxFireRate = weapons.reduce((acc, val) => acc = Math.max(acc, val.weaponStats!.fireRate), 0)
    data[2] = (data[2] * 100 / maxFireRate)

    const maxReloadtimeSeconds = weapons.reduce((acc, val) => acc = Math.max(acc, val.weaponStats!.reloadTimeSeconds), 0)
    data[3] = 100 - (data[3] * 100 / maxReloadtimeSeconds)

    const maxEquipTimeSeconds = weapons.reduce((acc, val) => acc = Math.max(acc, val.weaponStats!.equipTimeSeconds), 0)
    data[4] = 100 - (data[4] * 100 / maxEquipTimeSeconds)

    return data
  }
}
