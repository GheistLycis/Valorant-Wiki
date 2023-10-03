import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponsComponent } from './weapons.component';
import { WeaponsSelectionComponent } from './components/weapons-selection/weapons-selection.component';
import { WeaponsMatchComponent } from './components/weapons-match/weapons-match.component';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    WeaponsComponent,
    WeaponsSelectionComponent,
    WeaponsMatchComponent,
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbNavModule,
    NgChartsModule,
  ],
  exports: [
    WeaponsSelectionComponent,
  ]
})
export class WeaponsModule { }
