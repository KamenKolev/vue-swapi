import { CSSProperties } from "vue"
import { SortingFn } from "../utils/sort"

/**
 * Content can be rendered either through getValue, or using projection(slot)
 */
export type ColumnDefinition<T extends object = any> = {
  label: string
  sortingFn?: SortingFn<T>
  styles?: CSSProperties
} & (
  | { getValue: (entity: T) => string; slot?: undefined } // makes life easier afterwards
  | { getValue?: undefined; slot: string }
)

export type TableSlotData<T> = {
  item: T
}
