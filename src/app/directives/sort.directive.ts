import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from "@angular/core";
import { SortOrder } from "@enums/sort-order.enum";
import { SortEvent } from "@interfaces/sort-event.interface";


@Directive({
    selector: '[appSort]',
    standalone: true,
})
export class SortDirective implements AfterViewInit {
    @Output() sort!: EventEmitter<SortEvent>
    host!: HTMLElement
    children!: NodeListOf<HTMLElement>

    constructor(private element: ElementRef<HTMLElement>) {
        this.sort = new EventEmitter()
        this.host = element.nativeElement
    }

    ngAfterViewInit(): void {
        this.children = this.host.querySelectorAll('[sortBy]')
        
        this.children.forEach(el => {
            el.classList.add('pointer')
            el.setAttribute('order', '')
            el.onclick = this.sorting.bind(this, el)
        })
    }

    sorting(el: HTMLElement): void {
        const sort = el.getAttribute('sortBy') as SortEvent['sort']
        let order = el.getAttribute('order') as keyof typeof SortOrder 

        // UPDATING CLICKED ELEMENT
        el.setAttribute('order', SortOrder[order])
        order = el.getAttribute('order') as keyof typeof SortOrder 
        order ? el.classList.add('active') : el.classList.remove('active')
        
        // UPDATING OTHER ELEMENTS
        this.children.forEach(child => {
            if(child != el) {
                child.setAttribute('order', '')
                child.classList.remove('active')
            }
        })

        this.sort.emit({ sort, order })
    }
}
