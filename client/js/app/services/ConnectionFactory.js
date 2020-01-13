var stores = ["negociacoer"];
var version = 5;
var dbName = "aluraframe";

class ConnectionFactory {
	constructor() {
		throw new Error(
			"It is not possible to create new instace of ConnectionFactory"
		);
	}

	static getConnection() {
		return new Promise((resolve, reject) => {
			let openRequest = window.indexedDB.open(dbName, version);

			openRequest.onupgradeneeded = e => {
				ConnectionFactory._createStores(e.target.result);
			};

			openRequest.onsuccess = e => {
				resolve(e.target.result);
			};

			openRequest.onerror = e => {
				console.log(e.target.Error);
				reject(e.target.erro.name);
			};
		});
	}

	static _createStores(connection) {
		stores.forEach(store => {
			if (connection.objectStoreNames.contains(stores))
				connection.deleteObjectStore(store);

			connection.createObject(store, { autoIncrement: true });
		});
	}
}
