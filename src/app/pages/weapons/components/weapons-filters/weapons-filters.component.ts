import { Component, WritableSignal, signal } from '@angular/core';
import { Weapon } from '@interfaces/Weapon';
import { WeaponService } from '@services/weapon.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-weapons-filters',
  templateUrl: './weapons-filters.component.html',
  styleUrls: ['./weapons-filters.component.scss']
})
export class WeaponsFiltersComponent {
  $expanded!: WritableSignal<boolean>
  weapons$!: Observable<Weapon[]>
  searchByName$!: Subject<string>
  filteredWeapons$!: Subject<Weapon[]>

  constructor(private weaponService: WeaponService) {
    this.$expanded = signal(false)
    this.weapons$ = this.weaponService.list()
    this.searchByName$ = new Subject()
  }

  groupByFn(weapon: Weapon): string {
    return (weapon.shopData?.category || 'Melee').toUpperCase()
  }
}
