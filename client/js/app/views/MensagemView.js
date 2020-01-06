class MensagemView {
	constructor(elementoDOM) {
		this._elemento = elementoDOM;
	}

	_template(model) {
		return model.texto
			? `<p class="alert alert-info">${model.texto}</p>`
			: "<p></p>";
	}

	update(model) {
		this._elemento.innerHTML = this._template(model);
	}
}
