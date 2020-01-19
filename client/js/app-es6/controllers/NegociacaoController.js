import { ListaNegociacoes } from "../models/ListaNegociacoes";
import { Mensagem } from "../models/Mensagem";
import { NegociacoesView } from "../views/NegociacoesView";
import { MensagemView } from "../views/MensagemView";
import { NegociacaoService } from "../services/NegociacaoService";
import { DateHelper } from "../helpers/DateHelper";
import { Bind } from "../helpers/Bind";
import { Negociacao } from "../models/Negociacao";

class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputvalor = $("#valor");

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($("#negociacoesView")),
			"adiciona",
			"esvazia",
			"ordena",
			"inverteOrdem"
		);

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($("#mensagemView")),
			"texto"
		);

		this._ordemAtual = "";

		this._init();
	}

	_init() {
		new NegociacaoService()
			.lista()
			.then(negociacoes =>
				negociacoes.forEach(negociacao =>
					this._listaNegociacoes.adiciona(negociacao)
				)
			)
			.catch(erro => (this._mensagem.texto = err));

		setInterval(() => {
			this.importarNegociacoes();
		}, 5000);
	}
	adiciona(event) {
		event.preventDefault();
		let negociacao = this._criaNegociacao();
		new NegociacaoService()
			.cadastra(negociacao)
			.then(mensagem => {
				this._listaNegociacoes.adiciona(negociacao);
				this._mensagem.texto = mensagem;
				this._limpaForm();
			})
			.catch(err => (this._mensagem.texto = err));
	}

	importarNegociacoes() {
		let service = new NegociacaoService();

		service
			.importa(this._listaNegociacoes.negociacoes)
			.then(negociacoes =>
				negociacoes.forEach(negociacao => {
					this._listaNegociacoes.adiciona(negociacao);
					this._mensagem.texto =
						"Negociações do periodo importadas com sucesso";
				})
			)
			.catch(err => (this._mensagem.texto = err));
	}

	apaga() {
		new NegociacaoService()
			.apaga()
			.then(mensagem => {
				this._mensagem.texto = mensagem;
				this._listaNegociacoes.esvazia();
			})
			.catch(err => (this._mensagem.texto = err));
	}

	_criaNegociacao() {
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputvalor.value)
		);
	}

	_limpaForm() {
		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputvalor.value = 0.0;

		this._inputData.focus();
	}

	ordena(coluna) {
		if (this._ordemAtual == coluna) this._listaNegociacoes.inverteOrdem();
		else this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);

		this._ordemAtual = coluna;
	}
}
