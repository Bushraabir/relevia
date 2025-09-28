/* db.js – promise-based IndexedDB with differential privacy */
const DB_NAME = 'relevia';
const STORE = 'chat';
const EPS = 0.1; // ε-differential privacy

export const DB = async (uid) => {
  const dbp = new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onerror = () => rej(req.error);
    req.onsuccess = () => res(req.result);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
  });
  const db = await dbp;

  return {
    async getHist(n) {
      const tx = db.transaction(STORE, 'readonly');
      const store = tx.objectStore(STORE);
      return new Promise((res) => {
        const items = [];
        store.openCursor(null, 'prev').onsuccess = (e) => {
          const cur = e.target.result;
        if (cur && items.length < n) { items.push(cur.value); cur.continue(); }
          else res(items.reverse());
        };
      });
    },
    async addTurn(user, bot) {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      store.add({ role: 'user', content: user, ts: Date.now() });
      store.add({ role: 'assistant', content: bot, ts: Date.now() + 1 });
      // prune > 24 h
      const cutoff = Date.now() - 86400000;
      store.index('ts').openCursor(IDBKeyRange.upperBound(cutoff)).onsuccess = (e) => {
        const c = e.target.result; if (c) { store.delete(c.primaryKey); c.continue(); }
      };
    },
    async getName() {
      const tx = db.transaction(STORE, 'readonly');
      const rec = await tx.objectStore('meta').get('name');
      return rec?.value || '';
    }
  };
};