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
export const putDb = async (id, content) => {
  try {
    console.log("PUT to the database");
    const jatesDb = await openDB("jates", 1);
    const tx = jatesDb.transaction("jates", "readwrite");
    const store = tx.objectStore("jates");
    const request = store.put({ id: id, jate: content });
    const result = await request;
    console.log("Data saved to the database", result);
  } catch {
    console.error("putDb not implemented");
  }
};

// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("GET all from the database");
    const jatesDb = await openDB("jates", 1);
    const tx = jatesDb.transaction("jates", "readonly");
    const store = tx.objectStore("jates");
    const request = store.getAll();
    const result = await request;
    console.log("result.value", result);
    return result;
  } catch {
    console.error("getDb not implemented");
  }
};

initdb();
