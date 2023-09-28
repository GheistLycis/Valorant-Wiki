import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AgentsComponent } from './agents/agents.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    AgentsComponent,
    WeaponsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbCarouselModule,
  ]
})
export class PagesModule { }
