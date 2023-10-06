import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsComponent } from './agents.component';
import { AgentsFiltersComponent } from './components/agents-filter/agents-filters.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SortDirective } from '@directives/sort.directive';



@NgModule({
  declarations: [
    AgentsComponent,
    AgentsFiltersComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    SortDirective,
  ],
  exports: [
    AgentsFiltersComponent,
  ]
})
export class AgentsModule { }
