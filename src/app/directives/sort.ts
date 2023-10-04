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
        
        this.elements.forEach((el, i) => {
            el.classList.add('pointer')
            el.setAttribute('order', '')
            el.onclick = this.sorting.bind(this, el, i)
        })
    }

    sorting(el: HTMLElement, index: number): void {
        const sort = el.getAttribute('sortBy') as SortEvent['sort']
        const oldOrder = el.getAttribute('order') as keyof typeof SortOrder 

        el.setAttribute('order', SortOrder[oldOrder])
        if(el.getAttribute('order') != '') {
            el.classList.add('active')
        }
        else {
            el.classList.remove('active')
        }

        this.elements.forEach((el, i) => {
            if(i != index) {
                el.setAttribute('order', '')
                el.classList.remove('active')
            }
        })

        this.sort.emit({ sort, order: el.getAttribute('order') as keyof typeof SortOrder })
    }
}
