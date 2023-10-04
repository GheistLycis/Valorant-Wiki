import { Component, WritableSignal, signal } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponService } from '@services/weapon.service';
import { Observable, Subject, combineLatest, startWith, map, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-weapons-filters',
  templateUrl: './weapons-filters.component.html',
  styleUrls: ['./weapons-filters.component.scss']
})
export class WeaponsFiltersComponent {
  $expanded!: WritableSignal<boolean>
  weapons$!: Observable<Weapon[]>
  search$!: Subject<Weapon[]>
  selected$!: Subject<Weapon['uuid'][]>
  filteredWeapons$!: Observable<Weapon[]>

  constructor(private weaponService: WeaponService) {
    this.$expanded = signal(false)
    this.weapons$ = this.weaponService.list()
    this.search$ = new Subject()
    this.selected$ = new Subject()
    this.filteredWeapons$ = combineLatest({
      weapons: this.weapons$,
      searched: this.search$.pipe(
        startWith([] as Weapon[]),
        debounceTime(300),
        distinctUntilChanged(),
        map(weapons => weapons.map(({ uuid }) => uuid))
      ),
      selected: this.selected$.pipe(
        startWith([] as string[]),
      ),
    }).pipe(
      map(({ weapons, searched, selected }) => weapons
        .filter(({ uuid }) => {
          if(selected.length) return selected.includes(uuid)
          if(searched.length) return searched.includes(uuid)
          else return true
        })
        .sort((a, b) => a.displayName < b.displayName ? -1 : 1)
      ),
    )

    this.filteredWeapons$.subscribe(list => this.weaponService.$filteredWeapons.set(list))
  }

  groupByFn(weapon: Weapon): string {
    return (weapon.shopData?.category || 'Melee').toUpperCase()
  }

  groupValueFn(groupKey: string, children: Weapon[]): string[] {
    return children.map(({ uuid }) => uuid)
  }
}
