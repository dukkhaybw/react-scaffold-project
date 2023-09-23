const LOCAL = 'local';
const SESSION = 'session';

class Cache {
  constructor(type) {
    this.storage = type === LOCAL ? localStorage : sessionStorage;
  }

  setCache(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getCache(key) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  deleteCache(key) {
    this.storage.removeItem(key);
  }

  clearCache() {
    this.storage.clear();
  }
}

const localCache = new Cache(LOCAL);
const sessionCache = new Cache(SESSION);

export { localCache, sessionCache };
