class ListaNegociacoes {
	constructor() {
		this._negociacoes = [];
	}

	adiciona(negociacao) {
		// bad programming practices
		this._negociacoes = [].concat(this._negociacoes, negociacao);
		// this._negociacoes.push(negociacao);
	}

	get negociacoes() {
		return [].concat(this._negociacoes);
	}

	esvazia() {
		this._negociacoes = [];
	}
}
