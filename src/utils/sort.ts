type sortingFn<T> = (a: T, b: T) => number
type sortingFns<T> = Array<sortingFn<T>>
// TL:DR multiple sorting with priority

export type sort = <T>(
	fns: sortingFns<T>,
) => (data: ReadonlyArray<T>) => ReadonlyArray<T>
