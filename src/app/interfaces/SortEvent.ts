import { SortOrder } from "@enums/sort-order"

export interface SortEvent {
    sort: 'cost' | 'range' | 'fire-rate' | 'magazine'
    order: keyof typeof SortOrder
}
