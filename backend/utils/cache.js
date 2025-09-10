import NodeCache from 'node-cache';

class CacheService {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: 3600, // Default TTL: 1 hour
      checkperiod: 600 // Check for expired keys every 10 minutes
    });
  }

  async get(key) {
    return this.cache.get(key);
  }

  async set(key, value, ttl = null) {
    return this.cache.set(key, value, ttl || this.cache.options.stdTTL);
  }

  async del(key) {
    return this.cache.del(key);
  }

  async flush() {
    return this.cache.flushAll();
  }

  async getStats() {
    return this.cache.getStats();
  }
}

export const cache = new CacheService();