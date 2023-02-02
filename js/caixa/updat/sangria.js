import link from "../../setup/index.js"
import { data_atual } from "../../geradores/data.js"
import { hora_atual_segundos } from "../../geradores/hora.js"
import alterar from "../../olivia/altera.js"
import salvar from "../../olivia/salva.js"

const nome = localStorage.getItem("nome")

$(document).on("click", "#retirarSangria", function () {
    let retirada = $("#retirada").val()
    let valor_retirada = retirada.replace(",", ".")
    let id = "31" // ID DEVE SER SEMPRE O 1
    let caixa = sessionStorage.getItem("diaCaixa")
    let novo_caixa = parseFloat(caixa).toFixed(2) - parseFloat(valor_retirada).toFixed(2)

    let dados = {
        dia: data_atual(),
        hora: hora_atual_segundos(),
        usuario: nome,
        valor: valor_retirada,
        ac: caixa,
        ns: novo_caixa
    }
    
    alterar(`${link[30]}${id}/`, {caixa: novo_caixa})
    salvar(link[32], dados)
    setTimeout(() => {location.reload()}, 1000);
})
