import { AfterContentInit, Directive, ElementRef, EventEmitter, Output } from "@angular/core";
import { SortOrder } from "@enums/sort-order";
import { SortEvent } from "@interfaces/SortEvent";


@Directive({
    selector: '[appSort]',
    standalone: true,
})
export class SortDirective implements AfterContentInit {
    @Output() sort = new EventEmitter<SortEvent>()
    host!: HTMLElement
    elements!: NodeListOf<HTMLElement>

    constructor(private element: ElementRef<HTMLElement>) {
        this.host = element.nativeElement
    }

    ngAfterContentInit(): void {
        this.elements = this.host.querySelectorAll('[sortBy]')
        
        this.elements.forEach(el => {
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
        this.elements.forEach(element => {
            if(element != el) {
                element.setAttribute('order', '')
                element.classList.remove('active')
            }
        })

        this.sort.emit({ sort, order })
    }
}
