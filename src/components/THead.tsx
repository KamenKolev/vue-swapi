// A getValue function to sort by is an option
// I mean, it's cool, but it introduces the following issue
// Do you then sort by the computed value or by the source value? (there is no definitive source value)
type ColumnDefinition<T> = {
	key: Extract<keyof T, string | number | { toString(): string }>
	label: string
	sorting: "ASC" | "DESC" | null
}

type Props<T> = {
	entities: T[]
	columns: ColumnDefinition<T>[]
}

export default function Thead<T>(props: Props<T>) {}
