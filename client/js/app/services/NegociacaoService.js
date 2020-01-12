class NegociacaoService {
	constructor() {
		this._http = new HttpService();
	}

	obterNegociacoesDaSemana() {
		console.log("Importando negociacoes");

		return new Promise((resolve, reject) => {
			this._http
				.get("negociacoes/semana")
				.then(negociacoes =>
					resolve(
						negociacoes.map(
							objeto =>
								new Negociacao(
									new Date(objeto.data),
									objeto.quantidade,
									objeto.valor
								)
						)
					)
				)
				.catch(err => {
					console.log(err);
					reject("Não foi possível obter as negociações da semana");
				});
		});
	}

	obterNegociacoesDaSemanaAnterior() {
		console.log("Importando negociacoes");

		return new Promise((resolve, reject) => {
			this._http
				.get("negociacoes/anterior")
				.then(negociacoes =>
					resolve(
						negociacoes.map(
							objeto =>
								new Negociacao(
									new Date(objeto.data),
									objeto.quantidade,
									objeto.valor
								)
						)
					)
				)
				.catch(err => {
					console.log(err);
					reject("Não foi possível obter as negociações da semana");
				});
		});
	}

	obterNegociacoesDaSemanaRetrasada(cb) {
		console.log("Importando negociacoes");

		return new Promise((resolve, reject) => {
			this._http
				.get("negociacoes/retrasada")
				.then(negociacoes =>
					resolve(
						negociacoes.map(
							objeto =>
								new Negociacao(
									new Date(objeto.data),
									objeto.quantidade,
									objeto.valor
								)
						)
					)
				)
				.catch(err => {
					console.log(err);
					reject("Não foi possível obter as negociações da semana");
				});
		});
	}
}
