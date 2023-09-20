import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navItems = [
    {
      title: 'Agents',
      path: 'agents'
    },
    {
      title: 'Weapons',
      path: 'weapons'
    },
  ]
}
