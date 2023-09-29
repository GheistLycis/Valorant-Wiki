import { Component } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { WeaponService } from '@services/weapon.service';
import { Observable, tap } from 'rxjs';


@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent {
  weapons$!: Observable<Weapon[]>

  constructor(
    private weaponService: WeaponService,
    private carousel: NgbCarouselConfig,
  ) {
    this.carousel.interval = 0
    this.carousel.showNavigationIndicators = false
    this.weapons$ = this.weaponService.list().pipe(
      tap(values => console.log(values))
    )
  }

  addToComparison(weaponId: Weapon['uuid']): void {

  }
}
