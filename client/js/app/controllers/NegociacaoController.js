class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");
	}
	adiciona(event) {
		event.preventDefault();

		let data = new Date(
			...this._inputData.value
				.split("-")
				.map((item, indice) => item - (indice % 2))
		);

		let negociacao = new Negociacao(
			data,
			this._inputQuantidade.value,
			this._inputvalor.value
		);
		console.log(negociacao);
	}
}
