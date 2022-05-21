import { JsonCacheStorage } from "./cache"

export class MockStorage implements JsonCacheStorage {
	getItem(key: string): string | null {
		return key in this.data ? this.data[key] : null
	}
	setItem(key: string, value: string): void {
		this.data[key] = value
	}
	removeItem(key: string): void {
		delete this.data[key]
	}
	data: Record<string, string> = Object.create(null)
}

// TODO test "cacheJsonRequest"
