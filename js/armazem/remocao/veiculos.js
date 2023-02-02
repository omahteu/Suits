import { leituraVeiculos } from "../leitura/veiculos.js"
import link from "../../setup/index.js"
import apagar from "../../olivia/apaga.js"

$(document).on("click", "#remocaoVeiculo", function(){
	var id = $(this).attr("name")
	let url = `${link[15]}${id}/`
	apagar(url)
	leituraVeiculos()
})
