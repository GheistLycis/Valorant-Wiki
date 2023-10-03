import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AgentsComponent } from './agents/agents.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WeaponsModule } from './weapons/weapons.module';



@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    AgentsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    WeaponsModule,
  ]
})
export class PagesModule { }
