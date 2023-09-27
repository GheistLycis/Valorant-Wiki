import { Component, OnInit } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponService } from '@services/weapon.service';
import { map, Observable, forkJoin, concatMap } from 'rxjs';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {
  weapons$!: Observable<Weapon[]>
  weaponsIcons$!: Observable<string[]>

  constructor(private weaponService: WeaponService) {
    this.weapons$ = this.weaponService.list()
    this.weaponsIcons$ = this.weapons$.pipe(
      map(weapons => weapons.map(({ displayIcon }) => this.weaponService.getMedia(displayIcon))),
      concatMap(getMedias => forkJoin(getMedias)),
    )
  }

  ngOnInit(): void {
    // this.weapons$.subscribe()
  }
}
