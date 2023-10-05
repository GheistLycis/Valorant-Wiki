import { Component, Input, Signal, WritableSignal, computed } from '@angular/core';
import { palette } from '@enums/palette';
import { Weapon } from '@interfaces/Weapon';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.scss']
})
export class OverviewChartComponent {
  @Input('weapons') $weapons!: WritableSignal<Weapon[]>
  @Input('selectedWeapon') $selectedWeapon!: WritableSignal<Weapon>
  $data!: Signal<ChartData<'radar', number[], string>>
  options!: ChartOptions<'radar'>

  constructor() {
    this.$data = computed(() => ({
      labels: [
        'AVG DMG Head',
        'AVG DMG Body',
        'AVG DMG Legs',
        'Magazine Size',
        'Fire Rate (/s)',
        'Range (m)',
        'Reload Time (s)'
      ],
      datasets: this.$weapons().map(({ displayName, weaponStats, uuid }) => {
        const { damageRanges, magazineSize, fireRate, reloadTimeSeconds } = weaponStats!
        const dataset: ChartDataset<'radar', number[]> = {
          label: displayName,
          data: [
            (damageRanges.reduce((acc, { headDamage }) => acc += headDamage, 0)) / (damageRanges.length),
            (damageRanges.reduce((acc, { bodyDamage }) => acc += bodyDamage, 0)) / (damageRanges.length),
            (damageRanges.reduce((acc, { legDamage }) => acc += legDamage, 0)) / (damageRanges.length),
            magazineSize,
            fireRate,
            damageRanges.reduce((acc, { rangeEndMeters }) => acc = Math.max(rangeEndMeters, acc), 0),
            reloadTimeSeconds
          ],
          order: uuid == this.$selectedWeapon().uuid ? 0 : 1,
        }

        return dataset
      })
    }))
    this.options = {
      elements: {
        line: {
          borderWidth: 3,
          tension: 0.5,
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
          },
        },
        tooltip: {
          callbacks: {
            title: ([ tooltip ]) => tooltip.dataset.label!.toUpperCase(),
            label: ({ parsed, label }) => `${parsed.r.toFixed(2)} ${label.match(/(?<=\()(.*?)(?=\))/)?.[0] || ''}`, // GET MEASURE UNITY IF ANY
          },
          titleFont: {
            family: 'secondary',
            size: 20,
          },
          bodyFont: {
            family: 'secondary',
            size: 35,
            weight: '700',
          },
          boxHeight: 0,
          boxWidth: 0,
        },
      }
    }
  }
}
