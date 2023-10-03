import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponsComponent } from './weapons.component';
import { WeaponsSelectionComponent } from './components/weapons-selection/weapons-selection.component';
import { WeaponsAnalysisComponent } from './components/weapons-analysis/weapons-analysis.component';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { WeaponsFiltersComponent } from './components/weapons-filters/weapons-filters.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    WeaponsComponent,
    WeaponsSelectionComponent,
    WeaponsAnalysisComponent,
    WeaponsFiltersComponent,
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbNavModule,
    NgChartsModule,
    NgSelectModule,
  ],
  exports: [
    WeaponsSelectionComponent,
    WeaponsFiltersComponent,
  ]
})
export class WeaponsModule { }
