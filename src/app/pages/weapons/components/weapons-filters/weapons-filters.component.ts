import { Component, WritableSignal, signal } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponService } from '@services/weapon.service';
import { Observable, Subject, combineLatest, startWith, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-weapons-filters',
  templateUrl: './weapons-filters.component.html',
  styleUrls: ['./weapons-filters.component.scss']
})
export class WeaponsFiltersComponent {
  $expanded!: WritableSignal<boolean>
  weapons$!: Observable<Weapon[]>
  nameSearch$!: Subject<string>
  selectedWeapon$!: Subject<Weapon>
  filteredWeapons$!: Observable<Weapon[]>

  constructor(private weaponService: WeaponService) {
    this.$expanded = signal(false)
    this.weapons$ = this.weaponService.list()
    this.nameSearch$ = new Subject()
    this.selectedWeapon$ = new Subject()
    this.filteredWeapons$ = combineLatest({
      weapons: this.weapons$,
      search: this.nameSearch$.pipe(startWith(undefined), map(search => search?.toLowerCase().trim()), distinctUntilChanged()), 
      id: this.selectedWeapon$.pipe(startWith(undefined), map(weapon => weapon?.uuid)),
    }).pipe(
      map(({ weapons, search, id }) => weapons
        .filter(({ uuid, displayName }) => {
          if(id) return uuid == id
          else if(search) return displayName.toLowerCase().includes(search)
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
}
