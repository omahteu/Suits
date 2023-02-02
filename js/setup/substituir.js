import { registraLimiteTroca } from "../../qwertyu.js"

import ligar_luz from "../automacao/ligar.js"
import desligar_luz from "../automacao/desligar.js"

import tempo_pausado from "../quartos/ajax/post/decorrido.js"
import { registra_troca } from "../quartos/ajax/post/troca.js"

import alterar from "../olivia/altera.js"

import encerrar_tarefas from "../limpar/tarefas.js"

import { tick } from "../setup/box.js"
import link from "../setup/index.js"
import { fimModalTroca } from "../setup/troca.js"
import { play } from "../setup/start_relogios.js"
import { stop } from "../setup/stop_relogios.js"

import locado from "../tags/locacao.js"
import aguardando from "../tags/aguardo.js"
import desfazer from "../tags/desfazer.js"



$("#substituir").click(function () {
    let quarto = $("#quarto_antigo").val()
    let novo = $("#quartos_disponiveis").val()
    let usuario = $("#usuario_sistema").text()
    let hora = $(`#hora${quarto}`).text()
    let minuto = $(`#minuto${quarto}`).text()
    let segundo = $(`#segundo${quarto}`).text()
    trocaComanda(quarto, novo)
    trocaPatio(quarto, novo)
    trocaCofre(quarto, novo)
    setTimeout(() => { registra_troca(usuario, quarto, novo) }, 100)
    setTimeout(() => { tempo_pausado(hora, minuto, segundo, quarto) }, 100)
    setTimeout(() => {desligar_luz(quarto)}, 500)
    setTimeout(() => {registraLimiteTroca(novo, "a", "troca")}, 600)
    setTimeout(() => {encerrar_tarefas(quarto)}, 700)
    setTimeout(() => { iniciando(quarto, novo, hora, minuto, segundo) }, 1000)
    setTimeout(() => { finalizando(quarto) }, 1500)
    setTimeout(() => {ligar_luz(novo)}, 2000)
})

function iniciando(antigo, suite, hora, minuto, segundo) {
    var p = [hora, minuto, segundo]
    let flags = tick[`${suite}`]
    setTimeout(() => { locado(suite, flags[0], flags[1], flags[2]) }, 200)
    setTimeout(() => { play[suite](suite, p[0], p[1], p[2]) }, 300)
    setTimeout(() => { fimModalTroca() }, 400)
    setTimeout(() => {
        $.get(link[11], e => {
            var dados = e.filter(item => item.quarto === antigo)
            dados.forEach(e => {
                sessionStorage.setItem("ficha", JSON.stringify(e))
            })
        })

    }, 500)
    setTimeout(() => {
        var card = JSON.parse(sessionStorage.getItem("ficha"))
        var ficha = {
            datahora: card.datahora,
            valor: card.valor,
            quarto: suite,
            tipo: "locado"
        }
        $.post(link[11], ficha, () => { sessionStorage.removeItem("ficha") })
    }, 700)
}

function finalizando(suite) {
    let flags = tick[`${suite}`]
    stop[suite]()
    setTimeout(() => { desfazer(suite, flags[0], flags[1], flags[2]) }, 200)
    setTimeout(() => { aguardando(suite, flags[0], flags[1], flags[2]) }, 300)
    setTimeout(() => {
        $.get(link[11], function (e) {
            var dados = e.filter(item => item.quarto === suite)
            dados.forEach(e => {
                sessionStorage.setItem("fichas", JSON.stringify(e))
            })
        })
    }, 500)
    setTimeout(() => {
        var card = JSON.parse(sessionStorage.getItem("fichas"))
        var id = card.id
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: `${link[11]}${id}/`,
            type: 'PATCH',
            data: JSON.stringify({ tipo: "aguardando" }),
            success: function () {
                sessionStorage.removeItem("fichas");
            },
            error: function (textStatus, errorThrown) {
                console.log(`ERRO: ${textStatus} - ${errorThrown}`)
            }
        })
    }, 700)
}

function trocaComanda(antigo, novo) {
    $.get(link[5], e => {
        let dados = e.filter(item => item.quarto === antigo)
        dados.forEach(el => {
            var id = el.id
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: `${link[5]}${id}/`,
                type: 'PATCH',
                data: JSON.stringify({ quarto: novo }),
                success: function () {
                    console.log("Troca de Comanda!");
                },
                error: function (textStatus, errorThrown) {
                    console.log(`ERRO: ${textStatus} - ${errorThrown}`)
                }
            })
        })
    })
}

function trocaPatio(antigo, novo) {
    $.get(link[15], e => {
        let dados = e.filter(item => item.quarto === antigo)
        dados.forEach(e => {
            var id = e.id
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: `${link[15]}${id}/`,
                type: 'PATCH',
                data: JSON.stringify({ quarto: novo }),
                success: function () {
                    console.log("Troca de Pátio!");
                },
                error: function (textStatus, errorThrown) {
                    console.log(`ERRO: ${textStatus} - ${errorThrown}`)
                }
            })
        })
    })
}

async function trocaCofre(suite, nsuite) {
    const rq = await fetch(link[36])
    const rs = await rq.json()
    
    let cofres = rs.filter(x => x.suite == suite)
    let id = cofres[0].id
    let dados = {suite: nsuite}
    let url = `${link[36]}${id}/`
    alterar(url, dados)
}
