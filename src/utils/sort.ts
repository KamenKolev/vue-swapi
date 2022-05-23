export type sortingFn<T = any> = (a: T, b: T) => number
export type sortingDirection = "ASC" | "DESC" | null
export function toggleSortingDirection(
  prev: sortingDirection,
): sortingDirection {
  switch (prev) {
    case "ASC":
      return "DESC"
    case "DESC":
      return null
    case null:
      return "ASC"
  }
}

export const getInvertedSortingFn =
  <T = any>(fn: sortingFn<T>): sortingFn<T> =>
  (a, b) =>
    -fn(a, b)

export const sortByString = (a: string, b: string) => a.localeCompare(b)
export const sortByNumber = (a: number, b: number) => a - b
export const sortWithSelector =
  <T = any, R = any>(selector: (item: T) => R) =>
  (sortFn: sortingFn<R>): sortingFn<T> =>
  (a, b) =>
    sortFn(selector(a), selector(b))
