import { registraLimite } from "../../qwertyu.js"

import ligar_luz from "../automacao/ligar.js"

import { fimModal } from "../setup/camareiras.js"
import { tick } from "../setup/box.js"
import { play } from "../setup/start_relogios.js"

import faxina from "../tags/faxina.js"
import index from "../tags/particao.js"


$(document).on("click", ".faxina", function () {
    const suite = $('#quarto_painel').text()
    const rota = $(this).attr('class')
    if (confirm(`Iniciar Faxina na Suíte ${suite}?`) == true) {
        let t = tick[`${suite}`]
        setTimeout(() => { faxina(suite, rota, t[0], t[1], t[2]) }, 1)
        /*
        setTimeout ( () => {ligar_luz(suite)
                    localStorage.setItem("luz", "ligada")               }, 100)
        */
        setTimeout(() => { registraLimite(suite, "a", "faxina") }, 200)
        setTimeout(() => { fimModal() }, 300)
        setTimeout(() => { index() }, 400)
        setTimeout(() => { play[suite](suite, "0", "0", "0") }, 500)
    }
})
