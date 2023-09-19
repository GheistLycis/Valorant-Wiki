import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LayoutComponent } from './layout.component';
import { AgentsComponent } from '../pages/agents/agents.component';
import { WeaponsComponent } from '../pages/weapons/weapons.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, 
  {
    path: '',
    component: LayoutComponent,
    children: [
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
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }