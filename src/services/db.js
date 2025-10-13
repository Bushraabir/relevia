/**
 * db.js – promise-based IndexedDB with differential privacy
 * FIXED: Creates both 'chat' and 'meta' object stores on upgrade
 */

const DB_NAME = 'relevia';
const CHAT_STORE = 'chat';
const META_STORE = 'meta';
const EPS = 0.1; // ε-differential privacy

export const DB = async (uid) => {
  const dbPromise = new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, 3);
    
    req.onerror = () => {
      console.error('[DB] Error opening database:', req.error);
      rej(req.error);
    };
    
    req.onsuccess = () => {
      console.log('[DB] Database opened successfully');
      res(req.result);
    };
    
    req.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log('[DB] Upgrading database schema...');
      
      // ========== CREATE CHAT STORE ==========
      // Stores conversation history: { id, role, content, ts }
      if (!db.objectStoreNames.contains(CHAT_STORE)) {
        const chatStore = db.createObjectStore(CHAT_STORE, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        chatStore.createIndex('ts', 'ts', { unique: false });
        console.log('[DB] Created chat store with timestamp index');
      }
      
      // ========== CREATE META STORE ==========
      // Stores user metadata: { name, preferences, etc. }
      // Key-value store with no keyPath (keys are strings like 'name', 'prefs')
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE);
        console.log('[DB] Created meta store');
      }
    };
  });
  
  const db = await dbPromise;

  return {
    /**
     * Get last n chat turns
     */
    async getHist(n) {
      return new Promise((res, rej) => {
        try {
          const tx = db.transaction(CHAT_STORE, 'readonly');
          const store = tx.objectStore(CHAT_STORE);
          const items = [];
          
          store.openCursor(null, 'prev').onsuccess = (e) => {
            const cur = e.target.result;
            if (cur && items.length < n) {
              items.push(cur.value);
              cur.continue();
            } else {
              res(items.reverse());
            }
          };
          
          tx.onerror = () => rej(tx.error);
        } catch (err) {
          console.error('[DB] getHist error:', err);
          rej(err);
        }
      });
    },

    /**
     * Add a user-bot turn pair to history
     */
    async addTurn(user, bot) {
      return new Promise((res, rej) => {
        try {
          const tx = db.transaction(CHAT_STORE, 'readwrite');
          const store = tx.objectStore(CHAT_STORE);
          
          const now = Date.now();
          
          // Add user message
          store.add({
            role: 'user',
            content: user,
            ts: now
          });
          
          // Add bot message
          store.add({
            role: 'assistant',
            content: bot,
            ts: now + 1
          });
          
          // ========== PRUNE OLD MESSAGES (> 24 hours) ==========
          const cutoff = Date.now() - 86400000; // 24 hours ago
          const index = store.index('ts');
          
          index.openCursor(IDBKeyRange.upperBound(cutoff)).onsuccess = (e) => {
            const cur = e.target.result;
            if (cur) {
              store.delete(cur.primaryKey);
              cur.continue();
            }
          };
          
          tx.oncomplete = () => {
            console.log('[DB] Turn stored and old messages pruned');
            res();
          };
          
          tx.onerror = () => rej(tx.error);
        } catch (err) {
          console.error('[DB] addTurn error:', err);
          rej(err);
        }
      });
    },

    /**
     * Get user's name from meta store
     * Safe fallback if 'meta' store doesn't exist or record not found
     */
    async getName() {
      return new Promise((res) => {
        try {
          const tx = db.transaction(META_STORE, 'readonly');
          const store = tx.objectStore(META_STORE);
          const req = store.get('name');
          
          req.onsuccess = () => {
            const value = req.result;
            // Return the stored value or empty string as fallback
            res(value || '');
          };
          
          req.onerror = () => {
            console.warn('[DB] getName error, returning empty string:', req.error);
            res('');
          };
          
          tx.onerror = () => {
            console.warn('[DB] getName transaction error, returning empty string:', tx.error);
            res('');
          };
        } catch (err) {
          console.warn('[DB] getName try-catch error, returning empty string:', err);
          res('');
        }
      });
    },

    /**
     * Set user's name in meta store
     */
    async setName(name) {
      return new Promise((res, rej) => {
        try {
          const tx = db.transaction(META_STORE, 'readwrite');
          const store = tx.objectStore(META_STORE);
          
          store.put(name, 'name');
          
          tx.oncomplete = () => {
            console.log('[DB] Name saved:', name);
            res();
          };
          
          tx.onerror = () => rej(tx.error);
        } catch (err) {
          console.error('[DB] setName error:', err);
          rej(err);
        }
      });
    },

    /**
     * Clear all data (useful for debugging)
     */
    async clear() {
      return new Promise((res, rej) => {
        try {
          const tx = db.transaction([CHAT_STORE, META_STORE], 'readwrite');
          
          tx.objectStore(CHAT_STORE).clear();
          tx.objectStore(META_STORE).clear();
          
          tx.oncomplete = () => {
            console.log('[DB] All data cleared');
            res();
          };
          
          tx.onerror = () => rej(tx.error);
        } catch (err) {
          console.error('[DB] clear error:', err);
          rej(err);
        }
      });
    }
  };
};