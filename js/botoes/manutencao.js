import { fimModal } from "../setup/camareiras.js"
import { tick } from "../setup/box.js"
import { play } from "../setup/start_relogios.js"

import manutencao from "../tags/manutencao.js"
import index from "../tags/particao.js"


$(document).on("click", ".manutencao", function () {
    const suite = $('#quarto_painel').text()
    const motivo = prompt("Motivo da Manutenção")
    localStorage.setItem("motivo", motivo)
    if (motivo != null) {
        let t = tick[`${suite}`]
        setTimeout(() => { manutencao(suite, t[0], t[1], t[2]) }, 1)
        setTimeout(() => { fimModal() }, 100)
        setTimeout(() => { index() }, 200)
        setTimeout(() => { play[suite](suite, "0", "0", "0") }, 300)
        setTimeout(() => {
            localStorage.setItem("botao", "desligado")
            localStorage.setItem("luz", "desligado")
        }, 400)
    }
})
