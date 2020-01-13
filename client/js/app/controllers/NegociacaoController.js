class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($("#negociacoesView")),
			"adiciona",
			"esvazia"
		);

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($("#mensagemView")),
			"texto"
		);

		ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.then(negociacoes =>
				negociacoes.forEach(negociacao =>
					this._listaNegociacoes.adiciona(negociacao)
				)
			)
			.catch(erro => {
				console.log(err);
				this._mensagem.texto = err;
			});
	}
	adiciona(event) {
		event.preventDefault();
		ConnectionFactory.getConnection().then(connection => {
			let negociacao = this._criaNegociacao();
			new NegociacaoDao(connection)
				.adiciona(negociacao)
				.then(() => {
					this._listaNegociacoes.adiciona(negociacao);
					this._mensagem.texto = "Negociação adicionada com sucesso";
					this._limpaForm();
				})
				.catch(err => (this._mensagem.texto = err));
		});
	}

	importarNegociacoes() {
		let service = new NegociacaoService();

		Promise.all([
			service.obterNegociacoesDaSemana(),
			service.obterNegociacoesDaSemanaAnterior(),
			service.obterNegociacoesDaSemanaRetrasada()
		])
			.then(negociacoes => {
				// console.log(negociacoes);
				negociacoes
					.reduce(
						(arrayFlatted, array) => arrayFlatted.concat(array),
						[]
					)
					.forEach(negociacao =>
						this._listaNegociacoes.adiciona(negociacao)
					);
				this._mensagem.texto = "Negociações importadas com sucesso";
			})
			.catch(err => {
				this._mensagem.texto = err;
				console.log(err);
			});
	}

	apaga() {
		ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagaTodos())
			.then(message => {
				this._mensagem.texto = message;
				this._listaNegociacoes.esvazia();
			})
			.catch(err => (this._mensagem.texto = err));
	}

	_criaNegociacao() {
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputvalor.value)
		);
	}

	_limpaForm() {
		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputvalor.value = 0.0;

		this._inputData.focus();
	}
}
