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
// TODO fix types
export const sortWithSelector =
	<T = any, R = any>(selector: (item: T) => R) =>
	(sortFn: sortingFn<R>): sortingFn<T> =>
	(a, b) =>
		sortFn(selector(a), selector(b))
// type sortingFns<T> = Array<sortingFn<T>>
// // TL:DR multiple sorting with priority

// export type sort = <T>(
// 	fns: sortingFns<T>,
// ) => (data: ReadonlyArray<T>) => ReadonlyArray<T>

// const toTableSortingFn =
// 	<T>(fn: sortingFn<T>) =>
// 	(direction: "ASC" | "DESC"): sortingFn<T> =>
// 	(a: T, b: T) => {
// 		const result = fn(a, b)
// 		if (direction === "ASC") return result
// 		return -result
// 	}

// // sorting: "ASC" | "DESC" | null
// const sortingFns = ref<Array<sortingFn<any>>>()
// const finalSortingFn = computed(() => {
// 	;(a: any, b: any) => {
// 		const usedSortFunction = sortingFns.value?.find(fn => fn(a, b) !== 0)
// 		return
// 	}
// })
