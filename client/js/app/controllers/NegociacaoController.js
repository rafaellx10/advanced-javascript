class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");

		let self = this;
		this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
			get(target, prop, receiver) {
				if (
					["adiciona", "esvazia"].includes(prop) &&
					typeof target[prop] == typeof Function
				) {
					return function() {
						console.log(`interceptando ${prop}`);
						Reflect.apply(target[prop], target, arguments);
						self._negociacoesView.update(target);
					};
				}
				return Reflect.get(target, prop, receiver);
			}
		});
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

	importarNegociacoes() {
		console.log("Importando negociacoes");
		let xhr = new XMLHttpRequest();

		xhr.open("GET", "negociacoes/semana");

		/*configuracoes*/
		/*  Estados
			0: requisição ainda não iniciada
            1: conexão com o servidor estabelecida
            2: requisição recebida
            3: processando requisição
            4: requisição está concluída e a resposta está pronta
        */
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					console.log("obtendo as negociações do servidor");
					console.log(JSON.parse(xhr.responseText));
					JSON.parse(xhr.responseText).map(objeto => {
						this._listaNegociacoes.adiciona(
							new Negociacao(
								new Date(objeto.data),
								objeto.quantidade,
								objeto.valor
							)
						);
					});
					this._mensagem.texto = "Negociações importadas com sucesso";
					this._mensagemViem.update(this._mensagem);
				} else {
					console.log(xhr.responseText);
					this._mensagem.texto =
						"Não foi possível obter as negociações da semana";
					this._mensagemViem.update(this._mensagem);
					console.log(
						"Não foi possível obter as negociações do servidor"
					);
				}
			}
		};

		/* Executar */
		xhr.send();
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
