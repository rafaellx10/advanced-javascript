class NegociacaoService {
	obterNegociacoesDaSemana(cb) {
		console.log("Importando negociacoes");
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
					console.log("obtendo as negociações do servidor");
					console.log(JSON.parse(xhr.responseText));
					cb(
						null,
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
					cb("Não foi possível obter as negociações da semana", null);
				}
			}
		};

		/* Executar */
		xhr.send();
	}

	obterNegociacoesDaSemanaAnterior(cb) {
		console.log("Importando negociacoes");
		let xhr = new XMLHttpRequest();

		xhr.open("GET", "negociacoes/anterior");

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					console.log("obtendo as negociações do servidor");
					console.log(JSON.parse(xhr.responseText));
					cb(
						null,
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
					cb(
						"Não foi possível obter as negociações da semana anterior",
						null
					);
				}
			}
		};

		xhr.send();
	}

	obterNegociacoesDaSemanaRetrasada(cb) {
		console.log("Importando negociacoes");
		let xhr = new XMLHttpRequest();

		xhr.open("GET", "negociacoes/retrasada");

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					console.log("obtendo as negociações do servidor");
					console.log(JSON.parse(xhr.responseText));
					cb(
						null,
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
					cb(
						"Não foi possível obter as negociações da semana retrasada",
						null
					);
				}
			}
		};

		xhr.send();
	}
}
