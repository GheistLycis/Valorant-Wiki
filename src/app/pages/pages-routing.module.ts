import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from '../pages/agents/agents.component';
import { WeaponsComponent } from '../pages/weapons/weapons.component';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  {
    path: 'agents',
    component: AgentsComponent,
  },
  {
    path: 'weapons',
    component: WeaponsComponent,
  },
  {
    path: 'maps',
    component: MapsComponent,
  },
  {
    path: '**',
    redirectTo: '/agents',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }