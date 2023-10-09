import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsComponent } from './agents.component';
import { AgentsFiltersComponent } from './components/agents-filter/agents-filters.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SortDirective } from '@directives/sort.directive';
import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    AgentsComponent,
    AgentsFiltersComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    SortDirective,
    LoadingSpinnerComponent
  ],
  exports: [
    AgentsFiltersComponent,
  ]
})
export class AgentsModule { }
