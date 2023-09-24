import { Component, OnInit } from '@angular/core';
import { WeaponService } from '@services/weapon.service';
import { tap, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {
  weaponImg$ = this.weaponService.list().pipe(
    tap(weapons => console.log(weapons)),
    switchMap(([ first ]) => this.weaponService.getMedia(first.displayIcon))
  )

  constructor(private weaponService: WeaponService) {}

  ngOnInit(): void {
    // this.weapons$.subscribe()
  }
}
