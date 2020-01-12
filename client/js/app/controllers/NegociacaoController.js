class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");

		this._negociacoesView = new NegociacoesView($("#negociacoesView"));

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			this._negociacoesView,
			["adiciona", "esvazia"]
		);

		this._mensagemView = new MensagemView($("#mensagemView"));
		this._mensagem = new Bind(new Mensagem(), this._mensagemView, [
			"texto"
		]);
	}
	adiciona(event) {
		event.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());

		this._mensagem.texto = "Negociação adicionada com sucesso";

		this._limpaForm();
	}

	importarNegociacoes() {
		let service = new NegociacaoService();

		service.obterNegociacoesDaSemana((err, negociacoes) => {
			if (err) {
				console.log(err);
				this._mensagem.texto = err;
				return;
			}

			console.log(negociacoes);
			negociacoes.forEach(negociacao => {
				this._listaNegociacoes.adiciona(negociacao);
			});
			this._mensagem.texto = "Negociações importadas com sucesso";
		});
	}

	apaga() {
		this._listaNegociacoes.esvazia();

		this._mensagem.texto = "Negociacoes apagada com sucesso";
	}

	_criaNegociacao() {
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputvalor.value
		);
	}

	_limpaForm() {
		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputvalor.value = 0.0;

		this._inputData.focus();
	}
}
