import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  @ViewChildren('navItem') navItemsRefs!: QueryList<ElementRef<HTMLDivElement>>
  @ViewChild('seekingBox') seekingBox!: ElementRef<HTMLDivElement>
  navItems = [
    {
      title: 'Agents',
      path: 'agents'
    },
    {
      title: 'Weapons',
      path: 'weapons'
    },
    {
      title: 'Maps',
      path: 'maps'
    },
  ]

  ngAfterViewInit(): void {
    this.navItemsRefs.forEach(({ nativeElement }, i, items) => {
      nativeElement.addEventListener('mouseover', () => {
        this.seekingBox.nativeElement.style.left = nativeElement.offsetLeft + 10 + 'px'

        items.forEach(item => {
          if(item.nativeElement != nativeElement) {
            item.nativeElement.style.opacity = '0.3'
          }
        })
      })

      nativeElement.addEventListener('mouseout', () => {
        this.seekingBox.nativeElement.style.left = '90vw'

        items.forEach(item => {
          if(item.nativeElement != nativeElement) {
            item.nativeElement.style.opacity = '1'
          }
        })
      })
    })
  }
}
