import { Component, WritableSignal, signal } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponService } from '@services/weapon.service';
import { Observable, Subject, combineLatest, startWith, map } from 'rxjs';

@Component({
  selector: 'app-weapons-filters',
  templateUrl: './weapons-filters.component.html',
  styleUrls: ['./weapons-filters.component.scss']
})
export class WeaponsFiltersComponent {
  $expanded!: WritableSignal<boolean>
  weapons$!: Observable<Weapon[]>
  selectedWeapons$!: Subject<Weapon['uuid'][]>
  filteredWeapons$!: Observable<Weapon[]>

  constructor(private weaponService: WeaponService) {
    this.$expanded = signal(false)
    this.weapons$ = this.weaponService.list()
    this.selectedWeapons$ = new Subject()
    this.filteredWeapons$ = combineLatest({
      weapons: this.weapons$,
      ids: this.selectedWeapons$.pipe(
        startWith([] as string[]), 
      ),
    }).pipe(
      map(({ weapons, ids }) => weapons
        .filter(({ uuid }) => ids.length ? ids.includes(uuid) : true)
        .sort((a, b) => a.displayName < b.displayName ? -1 : 1)
      ),
    )

    this.filteredWeapons$.subscribe(list => this.weaponService.$filteredWeapons.set(list))
  }

  groupByFn(weapon: Weapon): string {
    return (weapon.shopData?.category || 'Melee').toUpperCase()
  }

  groupValueFn(label: string, children: Weapon[]): string[] {
    return children.map(({ uuid }) => uuid)
  }
}
