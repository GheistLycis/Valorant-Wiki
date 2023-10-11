import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { WeaponsModule } from './weapons/weapons.module';
import { AgentsModule } from './agents/agents.module';
import { MapsModule } from './maps/maps.module';



@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    WeaponsModule,
    AgentsModule,
    MapsModule,
  ]
})
export class PagesModule { }
