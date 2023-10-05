import { Component, Input, Signal, WritableSignal, computed } from '@angular/core';
import { palette } from '@enums/palette';
import { Weapon } from '@interfaces/Weapon';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-damage-chart',
  templateUrl: './damage-chart.component.html',
  styleUrls: ['./damage-chart.component.scss']
})
export class DamageChartComponent {
  @Input('selectedWeapon') $selectedWeapon!: WritableSignal<Weapon>
  $data!: Signal<ChartData<'line', any[], string>>
  options!: ChartOptions<'line'>

  constructor() {
    this.$data = computed(() => {
      const { damageRanges } = this.$selectedWeapon().weaponStats!

      return {
        labels: damageRanges.map(range => `${range.rangeStartMeters} - ${range.rangeEndMeters}`),
        datasets: [
          {
            label: 'Head',
            data: damageRanges.map(range =>  range.headDamage),
          },
          {
            label: 'Body',
            data: damageRanges.map(range => range.bodyDamage),
          },
          {
            label: 'Leg',
            data: damageRanges.map(range => range.legDamage),
          },
        ]
      }
    })
    this.options = {
      color: palette['dark-gray'],
      scales: {
        x: {
          ticks: {
            color: palette['dark-gray'],
            font: {
              family: 'secondary',
              size: 14,
            },
          },
          title: {
            display: true,
            text: 'Range Zones (m)',
            color: palette['dark-gray'],
            font: {
              family: 'secondary',
              size: 16,
            },
          }
        },
        y: {
          ticks: {
            color: palette['dark-gray'],
            font: {
              family: 'secondary',
              size: 14,
            },
          },
          title: {
            display: true,
            text: 'DMG',
            color: palette['dark-gray'],
            font: {
              family: 'secondary',
              size: 16,
            },
          }
        },
      },
      elements: {
        line: {
          tension: 0.3,
        },
        point: {
          radius: 3,
          hoverRadius: 6,
          borderWidth: 0,
        },
      },
      plugins: {
        legend: {
          labels: {
            color: palette['dark-gray'],
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          callbacks: {
            title: ([ firstPoint ]) => firstPoint.formattedValue,
            label: () => '',
          },
          titleFont: {
            family: 'secondary',
            size: 20,
          },
        },
      },
    }
  }
}
