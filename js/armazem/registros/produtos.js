import { leituraProdutos } from "../leitura/produtos.js"
import { hora_atual } from "../../geradores/hora.js"
import link from "../../setup/index.js"
import salvar from "../../olivia/salva.js"

export function registroProdutos(){
	var produto = {
		quarto: $("#quarto_painel").text(),
		descricao: $("#descricao").val(),
		quantidade: $("#quantidade").val(),
		valor_total: $("#valor_total").val().slice(3),
		valor_unitario: $("#valor_unitario").val().slice(3),
		datahora: hora_atual(),
		valor_quarto: $("#valor-quarto").text()
	}
	salvar(link[5], produto)
	leituraProdutos();
	document.getElementById('formCadastros').reset();
	alert(`Produto adicionado à Suíte ${$("#quarto_painel").text()}`)
}
