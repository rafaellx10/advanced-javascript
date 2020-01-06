class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");
	}
	adiciona(event) {
		event.preventDefault();

		let helper = new DateHelper();

		// let data = helper.textoParaData(this._inputData.value);

		let negociacao = new Negociacao(
			helper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputvalor.value
		);
		console.log(negociacao);

		// let diaMesAno =

		console.log(helper.dataParaTexto(negociacao.data));
	}
}
