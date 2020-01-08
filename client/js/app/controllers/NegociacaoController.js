class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");

		// this._listaNegociacoes = new ListaNegociacoes(model => {
		// 	console.log(this);
		// 	this._negociacoesView.update(model);
		// });

		this._negociacoesView = new NegociacoesView($("#negociacoesView"));
		this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem = new Mensagem();
		this._mensagemViem = new MensagemView($("#mensagemView"));
		this._mensagemViem.update(this._mensagem);
	}
	adiciona(event) {
		event.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());

		this._mensagem.texto = "Negociação adicionada com sucesso";
		this._mensagemViem.update(this._mensagem);

		this._limpaForm();
	}

	apaga() {
		this._listaNegociacoes.esvazia();

		this._mensagem.texto = "Negociacoes apagada com sucesso";
		this._mensagemViem.update(this._mensagem);
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
