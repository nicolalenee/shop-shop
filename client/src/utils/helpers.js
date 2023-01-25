export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

// indexedDB helper function => persist cart data for user
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to db with version 1
    const request = window.indexedDB.open("shop-shop", 1);

    // create vars to hold ref to db, transaction, and obj store
    let db, tx, store;

    // if version has changed or if first time using the db, run this method and create the obj stores
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // create obj store for each type of data
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    //handle connection errs
    request.onerror = function (e) {
      console.log("There was an error");
    };

    //on db open success
    request.onsuccess = function (e) {
      db = request.result;
      // open a transaction w desired permissions
      tx = db.transaction(storeName, "readwrite");
      // save a ref
      store = tx.objectStore(storeName);

      // inform errs
      db.onerror = function (e) {
        console.log("error", e);
      };
      // check which value we passed in as a method & perform on obj store
      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("No valid method!");
          break;
      }
      // when transaction is complete,close connection
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
