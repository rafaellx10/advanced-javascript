class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");
	}
	adiciona(event) {
		event.preventDefault();

		console.log(this.inputData.value);
		console.log(this.inputQuantidade.value);
		console.log(this.inputvalor.value);
	}
}
