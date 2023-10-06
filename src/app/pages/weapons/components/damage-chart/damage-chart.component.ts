import { Component, Input, OnInit } from '@angular/core';
import { palette } from '@enums/palette';
import { Weapon } from '@interfaces/Weapon';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-damage-chart',
  templateUrl: './damage-chart.component.html',
  styleUrls: ['./damage-chart.component.scss']
})
export class DamageChartComponent implements OnInit {
  @Input('weapon') weapon!: Weapon
  data!: ChartData<'line', number[], string>
  options!: ChartOptions<'line'>

  constructor() {
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
              size: 18,
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
              size: 18,
            },
          }
        },
      },
      elements: {
        line: {
          tension: 0.3,
        },
        point: {
          radius: 10,
          hoverRadius: 14,
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

  ngOnInit(): void {
    const { damageRanges } = this.weapon.weaponStats!

    this.data = {
      labels: damageRanges.map(range => `${range.rangeStartMeters} - ${range.rangeEndMeters}`),
      datasets: [
        {
          label: 'Head',
          data: damageRanges.map(range =>  range.headDamage),
          borderColor: `rgba(200, 0, 0, 0.4)`,
          pointBackgroundColor: `rgb(200, 0, 0)`,
        },
        {
          label: 'Body',
          data: damageRanges.map(range => range.bodyDamage),
          borderColor: `rgba(200, 100, 0, 0.5)`,
          pointBackgroundColor: `rgb(200, 100, 0)`,
        },
        {
          label: 'Leg',
          data: damageRanges.map(range => range.legDamage),
          borderColor: `rgba(200, 200, 0, 0.6)`,
          pointBackgroundColor: `rgb(200, 200, 0)`,
        },
      ]
    }
  }
}
