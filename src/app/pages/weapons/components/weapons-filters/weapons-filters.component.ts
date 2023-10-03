import { Component, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-weapons-filters',
  templateUrl: './weapons-filters.component.html',
  styleUrls: ['./weapons-filters.component.scss']
})
export class WeaponsFiltersComponent {
  $expanded!: WritableSignal<boolean>

  constructor() {
    this.$expanded = signal(false)
  }
}
