import { NegociacaoController } from "./controllers/NegociacaoController";
import {} from "./polyfill/fetch";

let NegociacaoController = new NegociacaoController();

document.querySelector(".form").onsubmit = NegociacaoController.adiciona.bind(
	NegociacaoController
);
document.querySelector(
	"[type=button]"
).onclick = NegociacaoController.adiciona.bind(NegociacaoController);
