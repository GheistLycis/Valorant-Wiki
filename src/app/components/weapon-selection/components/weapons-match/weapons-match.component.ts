import { Component, Signal, computed } from '@angular/core';
import { palette } from '@enums/palette';
import { Weapon } from '@interfaces/Weapon';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { WeaponService } from '@services/weapon.service';
import { ChartConfiguration } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-weapons-match',
  templateUrl: './weapons-match.component.html',
  styleUrls: ['./weapons-match.component.scss']
})
export class WeaponsMatchComponent {
  selectedWeapon!: Weapon['uuid']
  $weapons = this.weaponService.$selectedWeapons
  options: ChartConfiguration<'radar'>['options'] = {
    color: palette.black,
    plugins: {
      title: {
        display: true,
        text: 'Gastos por Categoria',
        color: palette.black,
        font: {
          family: 'Overpass',
          size: 20,
        },
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Overpass',
          },
        },
      },
      datalabels: {
        color: palette.black,
        font: {
          size: 16,
          weight: 700,
          family: 'Overpass',
        },
        formatter: (value, ctx) => console.log(value, ctx),
      },
      tooltip: {
        callbacks: {
          label: ({ dataset, parsed }) => console.log(dataset, parsed),
        },
        titleFont: {
          family: 'Overpass',
        },
        bodyFont: {
          family: 'Overpass',
        }
      },
    },
  }
  plugins = [DataLabelsPlugin]
  $data!: Signal<any>

  constructor(
    public weaponService: WeaponService,
    private navConfig: NgbNavConfig
  ) {
    this.navConfig.animation = true

    this.$data = computed(() => ({
      labels: [
        'Price',
        'Equip Time',
        'Reload Time',
        'Range',
        '1st Bullet Accur.',
        'Magazine',
        'Burst Count',
        'Fire Rate',
        'Zoom Mult.',
        'Run Speed Mult.',
        'AVG DMG - Head',
        'AVG DMG - Body',
        'AVG DMG - Legs',
      ],
      datasets: this.$weapons().map(weapon => {
        const data: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

        return {
          label: weapon.displayName,
          data,
          fill: true,
          // order: weapon.uuid == this.selectedWeapon ? 1 : 0,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)',
        }
      })
    }))
  }
}
