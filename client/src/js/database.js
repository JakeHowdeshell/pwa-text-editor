import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("PUT to the database");
    const jatesDb = await openDB("jate", 1);
    const tx = jatesDb.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log(" Data saved to the database", result);
  } catch {
    console.error("putDb not implemented");
  }
};

// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("GET all from the database");
    const jatesDb = await openDB("jate", 1);
    const tx = jatesDb.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.getAll();
    const result = await request;
    console.log("result.value", result);
    return result.value;
  } catch {
    console.error("getDb not implemented");
  }
};

initdb();
