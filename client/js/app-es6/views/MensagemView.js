import { View } from "./View";

export class MensagemView extends View {
	constructor(elementoDOM) {
		super(elementoDOM);
	}

	template(model) {
		return model.texto
			? `<p class="alert alert-info">${model.texto}</p>`
			: "<p></p>";
	}
}
