import { Component, WritableSignal, signal } from '@angular/core';
import { SortEvent } from '@interfaces/SortEvent';
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
  sort$!: Subject<SortEvent>
  filteredWeapons$!: Observable<Weapon[]>

  constructor(private weaponService: WeaponService) {
    this.$expanded = signal(false)
    this.weapons$ = weaponService.list()
    this.search$ = new Subject()
    this.selected$ = new Subject()
    this.sort$ = new Subject()
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
      sort: this.sort$.pipe(
        startWith(undefined)
      )
    }).pipe(
      map(({ weapons, searched, selected, sort }) => weapons
        .filter(({ uuid }) => {
          if(selected.length) return selected.includes(uuid)
          if(searched.length) return searched.includes(uuid)
          else return true
        })
        .sort((a, b) => {
          if(!sort || sort.order == '') {
            return a.displayName < b.displayName ? -1 : 1
          }
          else {
            const value = sort.order == 'ASC' ? -1 : 1 

            switch(sort.sort) {
              case 'cost':
                return (a.shopData?.cost || 0) < (b.shopData?.cost || 0) ? value : -value
                
              case 'range':
                return (a.weaponStats?.damageRanges[0].rangeEndMeters || 0) < (b.weaponStats?.damageRanges[0].rangeEndMeters || 0) ? value : -value

              case 'fire-rate':
                return (a.weaponStats?.fireRate || 0) < (b.weaponStats?.fireRate || 0) ? value : -value

              case 'magazine':
                return (a.weaponStats?.magazineSize || 0) < (b.weaponStats?.magazineSize || 0) ? value : -value
            }
          }
        })
      ),
    )

    this.filteredWeapons$.subscribe(list => weaponService.$filteredWeapons.set(list))
  }

  groupByFn(weapon: Weapon): string {
    return (weapon.shopData?.category || 'Melee').toUpperCase()
  }

  groupValueFn(groupKey: string, children: Weapon[]): string[] {
    return children.map(({ uuid }) => uuid)
  }
}
