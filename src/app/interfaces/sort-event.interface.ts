import { SortOrder } from "@enums/sort-order.enum";

export interface SortEvent {
    sort: 'cost' | 'range' | 'fire-rate' | 'magazine'
    order: keyof typeof SortOrder
}
