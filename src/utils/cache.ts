export type JsonCacheStorage = Pick<
  Window["localStorage"],
  "getItem" | "setItem" | "removeItem"
>

/**
 * Can throw if fetch fails
 */
export const cacheJsonRequest =
  (storage: JsonCacheStorage = localStorage) =>
  (localStorageKey: string) =>
  <T>(
    requestFn: () => Promise<T>,
    reviver?: (key: string | number, value: unknown) => any,
  ) =>
  async () => {
    const cached = storage.getItem(localStorageKey)

    if (cached) {
      try {
        return JSON.parse(cached, reviver) as T
      } catch {
        storage.removeItem(localStorageKey)
      }
    }

    const data = await requestFn()
    storage.setItem(localStorageKey, JSON.stringify(data))
    return data
  }
