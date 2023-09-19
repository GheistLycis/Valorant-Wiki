import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgentsComponent } from './agents/agents.component';
import { WeaponsComponent } from './weapons/weapons.component';



@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    AgentsComponent,
    WeaponsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
