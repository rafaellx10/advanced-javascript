const stores = ["negociacoer"];
const version = 5;
const dbName = "aluraframe";

let connection = null;

let close = null;
export class ConnectionFactory {
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
				if (!connection) {
					connection = e.target.result;
					// close = connection.close;
					close = connection.close.bind(connection);
					connection.close = function() {
						throw new Error(
							"You cannot close the connection directly"
						);
					};
				}
				resolve(connection);
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

	static closeConnection() {
		if (connection) {
			close();
			// Reflect.apply(close, connection, []);
			connection = null;
		}
	}
}
