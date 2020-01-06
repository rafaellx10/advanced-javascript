class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");
	}
	adiciona(event) {
		event.preventDefault();

		console.log(new Date("2020,11,05"));
		console.log(new Date("2020", "10", "06"));
		// console.log(new Date(2020, 11, 06));
		//["2020", "10", "06"].join(',');
		let data = new Date(this._inputData.value.split("-"));
		let data2 = new Date(this._inputData.value.replace(/-/g, ","));
		let data3 = new Date(
			...this._inputData.value.split("-").map(function(item, indice) {
				return item - (indice % 2);
			})
		);
		console.log(typeof data);
		console.log(data);
		console.log(data2);
		console.log(data3);
	}
}
