import { leituraVeiculos } from "../leitura/veiculos.js"
import link from "../../setup/index.js"
import salvar from "../../olivia/salva.js"

export function registroVeiculos(){
	var quarto =  $("#quarto_painel").text()
	var veiculo = $("#veiculo").val()
    var modelo = $("#modelo").val()
    var placa = $("#placa").val()
	var patio = {
		quarto: quarto,
		veiculo: veiculo,
		modelo: modelo,
		placa: placa
    }
	salvar(link[15], patio)
	leituraVeiculos()
	document.getElementById('formCadastros').reset();
}
