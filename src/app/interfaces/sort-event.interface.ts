import { SortOrder } from "@enums/sort-order.enum";

export interface SortEvent {
    sort: string
    order: keyof typeof SortOrder
}
