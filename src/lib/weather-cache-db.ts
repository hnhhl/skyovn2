// IndexedDB Cache System for Weather Data

interface CachedWeatherData {
  id: string
  data: any
  timestamp: number
  expiresAt: number
}

class WeatherCacheDB {
  private dbName = 'wego-weather-cache'
  private dbVersion = 1
  private storeName = 'weather-data'
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
          store.createIndex('expiresAt', 'expiresAt', { unique: false })
        }
      }
    })
  }

  async set(key: string, data: any, ttlMinutes: number = 30): Promise<void> {
    if (!this.db) await this.init()

    const now = Date.now()
    const expiresAt = now + (ttlMinutes * 60 * 1000)

    const cachedData: CachedWeatherData = {
      id: key,
      data,
      timestamp: now,
      expiresAt
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.put(cachedData)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async get(key: string): Promise<any | null> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const result = request.result

        if (!result) {
          resolve(null)
          return
        }

        // Check if data has expired
        if (result.expiresAt < Date.now()) {
          // Remove expired data
          this.delete(key)
          resolve(null)
          return
        }

        resolve(result.data)
      }
    })
  }

  async delete(key: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.delete(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.clear()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async cleanExpired(): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const index = store.index('expiresAt')
      const now = Date.now()

      const range = IDBKeyRange.upperBound(now)
      const request = index.openCursor(range)

      request.onerror = () => reject(request.error)
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          cursor.delete()
          cursor.continue()
        } else {
          resolve()
        }
      }
    })
  }
}

// Singleton instance
export const weatherCacheDB = new WeatherCacheDB()

// Initialize on first import
if (typeof window !== 'undefined') {
  weatherCacheDB.init().catch(console.error)

  // Clean expired data periodically
  setInterval(() => {
    weatherCacheDB.cleanExpired().catch(console.error)
  }, 5 * 60 * 1000) // Every 5 minutes
}
