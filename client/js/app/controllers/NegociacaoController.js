class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");
	}
	adiciona(event) {
		event.preventDefault();

		let negociacao = new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputvalor.value
		);
		console.log(negociacao);

		console.log(DateHelper.dataParaTexto(negociacao.data));
	}
}
