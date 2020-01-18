class HttpService {
	get(url) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.open("GET", url);

			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						// console.log("obtendo as negociações do servidor");
						// console.log(JSON.parse(xhr.responseText));
						resolve(JSON.parse(xhr.responseText));
					} else {
						console.log(xhr.responseText);
						console.log("Não foi possível obter as negociações");
						reject(xhr.responseText);
					}
				}
			};

			xhr.send();
		});
	}
	post(url, dado) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					if (xhr.status == 200)
						resolve(JSON.parse(xhr.responseText));
					else reject(xhr.responseText);
				}
			};
			xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
		});
	}
}
