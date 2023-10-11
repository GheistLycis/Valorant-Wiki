import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { WeaponsModule } from './weapons/weapons.module';
import { AgentsModule } from './agents/agents.module';



@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    WeaponsModule,
    AgentsModule
  ]
})
export class PagesModule { }
