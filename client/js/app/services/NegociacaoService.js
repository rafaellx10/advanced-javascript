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

	obterNegociacoes() {
		return Promise.all([
			this.obterNegociacoesDaSemana(),
			this.obterNegociacoesDaSemanaAnterior(),
			this.obterNegociacoesDaSemanaRetrasada()
		])
			.then(periodos => {
				let negociacoes = periodos
					.reduce((dados, periodo) => dados.concat(periodo), [])
					.map(dados => {
						// console.log(dados);
						return dados;
					});
				return negociacoes;
			})
			.catch(err => {
				console.log(err);
				throw new Error(err);
			});
	}

	cadastra(negociacao) {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.adiciona(negociacao))
			.then(() => "Negociação adicionada com sucesso")
			.catch(err => {
				console.log(err);
				throw new Error("Não foi possível adicionar a negociação");
			});
	}

	lista() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.catch(err => {
				console.log(err);
				throw new Error("Não foi possível obter as negociações");
			});
	}

	apaga() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagaTodos())
			.then(() => "Negociações apagadas com sucesso")
			.catch(err => {
				console.log(err);
				throw new Error("Não foi possível apagar as negociações");
			});
	}
}
