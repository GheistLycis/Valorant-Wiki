import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AgentsComponent } from '../pages/agents/agents.component';
import { WeaponsComponent } from '../pages/weapons/weapons.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, 
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'agents',
    component: AgentsComponent,
  },
  {
    path: 'weapons',
    component: WeaponsComponent,
  },
  { 
    path: '**', 
    component: NotFoundComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }