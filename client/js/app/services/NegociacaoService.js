class NegociacaoService {
	obterNegociacoesDaSemana() {
		console.log("Importando negociacoes");

		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.open("GET", "negociacoes/semana");

			/*configuracoes*/
			/*  Estados
				0: requisição ainda não iniciada
				1: conexão com o servidor estabelecida
				2: requisição recebida
				3: processando requisição
				4: requisição está concluída e a resposta está pronta
			*/
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						// console.log("obtendo as negociações do servidor");
						// console.log(JSON.parse(xhr.responseText));
						resolve(
							JSON.parse(xhr.responseText).map(
								objeto =>
									new Negociacao(
										new Date(objeto.data),
										objeto.quantidade,
										objeto.valor
									)
							)
						);
					} else {
						console.log(xhr.responseText);
						console.log(
							"Não foi possível obter as negociações da semana"
						);
						reject(
							"Não foi possível obter as negociações da semana"
						);
					}
				}
			};

			/* Executar */
			xhr.send();
		});
	}

	obterNegociacoesDaSemanaAnterior() {
		console.log("Importando negociacoes");

		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.open("GET", "negociacoes/anterior");

			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						// console.log("obtendo as negociações do servidor");
						// console.log(JSON.parse(xhr.responseText));
						resolve(
							JSON.parse(xhr.responseText).map(
								objeto =>
									new Negociacao(
										new Date(objeto.data),
										objeto.quantidade,
										objeto.valor
									)
							)
						);
					} else {
						console.log(xhr.responseText);
						console.log(
							"Não foi possível obter as negociações da semana anterior"
						);
						reject(
							"Não foi possível obter as negociações da semana anterior"
						);
					}
				}
			};

			xhr.send();
		});
	}

	obterNegociacoesDaSemanaRetrasada(cb) {
		console.log("Importando negociacoes");

		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.open("GET", "negociacoes/retrasada");

			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						// console.log("obtendo as negociações do servidor");
						// console.log(JSON.parse(xhr.responseText));
						resolve(
							JSON.parse(xhr.responseText).map(
								objeto =>
									new Negociacao(
										new Date(objeto.data),
										objeto.quantidade,
										objeto.valor
									)
							)
						);
					} else {
						console.log(xhr.responseText);
						console.log(
							"Não foi possível obter as negociações da semana retrasada"
						);
						reject(
							"Não foi possível obter as negociações da semana retrasada"
						);
					}
				}
			};

			xhr.send();
		});
	}
}
