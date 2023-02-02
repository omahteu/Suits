// Imports listados por ordem alfabética das pastas
import { registraLimiteManutencao, registraLimiteDesistencia, registraLimiteLimpeza } from "../../qwertyu.js"

import desligar_luz from "../automacao/desligar.js"
import ligar_luz from "../automacao/ligar.js"

import ultima_limpeza from "../botoes/limpar.js"

import envia_dados_limpeza from "../caixa/limpeza.js"
import envia_dados_faxina from "../caixa/faxina.js"
import envia_dados_manutencao from "../caixa/manutencao.js"

import { data_atual } from "../geradores/data.js"
import { hora_atual } from "../geradores/hora.js"

import fechar_cofre from "../limpar/cofre.js"
import encerrar_tarefas from "../limpar/tarefas.js"

import tempo_pausado from "../quartos/ajax/post/decorrido.js"
import { abrirMenu, fecharMenu } from "../quartos/estrutural/caixas.js"
import camareira_faxina from "../quartos/estrutural/camareira_faxina.js"
import listar_camareiras from "../quartos/estrutural/lista_camareiras.js"

import Suitesdisponiveis from "../relatorios/quartosDisponiveis.js"

import { fimModal } from "../setup/camareiras.js"
import atualiza_status from "../setup/atualiza.js"
import { inicioModalTroca } from "../setup/troca.js"
import { acao, tick } from "../setup/box.js"
import { play } from "../setup/start_relogios.js"
import { stop } from "../setup/stop_relogios.js"
import { clean } from "../setup/clean_relogios.js"

import aguardando from "../tags/aguardo.js"
import desfazer from "../tags/desfazer.js"
import faxina from "../tags/faxina.js"
import limpeza from "../tags/limpeza.js"
import camareiras from "../tags/camareira.js"

var rota = 'rota'

export function reacao(status, suite) {
    var flags = tick[`${suite}`]
    let h = $(`#hora${suite}`).text()
    let m = $(`#minuto${suite}`).text()
    let s = $(`#segundo${suite}`).text()
    let tempo = `${h}:${m}:${s}`
    let usuario = String($("#saudacao_usuario").text()).split(",")[1].trim()

    if (status == acao[0]) {
        var condicao = $("#tipo").text()
        var verificaoLuz = localStorage.getItem("luz")
        if (condicao == "manutencao") {
            var razao = localStorage.getItem("motivo")
            envia_dados_manutencao(usuario, data_atual(), hora_atual(), suite, razao, tempo)
            encerrar_tarefas(suite)
        }
        setTimeout(() => { ultima_limpeza(suite) }, 200)
        setTimeout(() => { encerrar_tarefas(suite) }, 1000)
        if (verificaoLuz == "ligada") {
            setTimeout(() => {
                desligar_luz(suite)
                localStorage.setItem("luz", "desligada")
            }, 500)
        }
        setTimeout(() => { desfazer(suite, flags[0], flags[1], flags[2]) }, 1000)
        setTimeout(() => { fimModal() }, 1001)
        setTimeout(() => {
            alert(`Disponibilizar a Suíte ${suite}?`)
            stop[suite]()
            clean[suite](suite)
        }, 500)
    } else if (status == acao[1]) {
        var tipo = $("#tipo").text()
        if (tipo == "manutencao") {
            var razao = localStorage.getItem("motivo")
            envia_dados_manutencao(usuario, data_atual(), hora_atual(), suite, razao, tempo)
            alert(`Iniciar faxina na Suíte ${suite}?`)
            stop[suite]()
            clean[suite](suite)
            play[suite](suite, "0", "0", "0")
            setTimeout(() => {
                ligar_luz(suite)
                localStorage.setItem("luz", "ligada")
            }, 500)
            setTimeout(() => { atualiza_status(suite, "faxina"), 800 })
            setTimeout(() => { faxina(suite, rota, flags[0], flags[1], flags[2]) }, 1000)
            setTimeout(() => { fimModal() }, 1001)
        } else {
            alert(`Iniciar faxina na Suíte ${suite}?`)
            stop[suite]()
            clean[suite](suite)
            play[suite](suite, "0", "0", "0")
            setTimeout(() => {
                ligar_luz(suite)
                localStorage.setItem("luz", "ligada")
            }, 500)
            setTimeout(() => { atualiza_status(suite, "faxina"), 800 })
            setTimeout(() => { faxina(suite, rota, flags[0], flags[1], flags[2]) }, 1000)
            setTimeout(() => { fimModal() }, 1001)
        }
    } else if (status == acao[2]) {
        alert(`Iniciar limpeza na Suíte ${suite}?`)
        localStorage.removeItem(`troca${suite}`)
        clean[suite](suite)
        play[suite](suite, "0", "0", "0")
        registraLimiteLimpeza(suite, "a", "limpeza")
    
        setTimeout(() => {
            ligar_luz(suite)
            localStorage.setItem("luz", "ligada")
        }, 500)

        setTimeout(() => { limpeza(suite, flags[0], flags[1], flags[2]) }, 700)
        setTimeout(() => { atualiza_status(suite, "limpeza"), 900 })
        setTimeout(() => { fimModal() }, 1000)
    } else if (status == acao[3]) {
        inicioModalTroca("modau-troca")
        fimModal()
        setTimeout(() => {
            var antigo = $("#quarto_painel").text()
            $("#quarto_antigo").val(antigo)
        }, 100)
        Suitesdisponiveis()
    } else if (status == acao[4]) {
        if (confirm(`Encerrar a Suíte ${suite}?`)) {
            stop[suite]()
            localStorage.setItem("last", suite)
            desligar_luz(suite)
            setTimeout(() => { registraLimiteDesistencia(suite, "a", "desistencia") }, 300)
            setTimeout(() => { tempo_pausado(h, m, s, suite) }, 600)
            setTimeout(() => { desfazer(suite, flags[0], flags[1], flags[2]) }, 900)
            setTimeout(() => { fimModal() }, 1001)
            setTimeout(() => { aguardando(suite, rota, flags[0], flags[1], flags[2]) }, 1200)
            setTimeout(() => { atualiza_status(suite, "aguardando"), 1500 })
            setTimeout(() => { window.open('../html/checkout.html', '_blank') }, 2000)
        }
    } else if (status == acao[5]) {
        if (confirm(`Encerrar limpeza da Suíte ${suite}?`) == true) {
            camareiras(suite)
            setTimeout(() => {
                var dados = {
                    caixa: usuario,
                    data: data_atual(),
                    hora: hora_atual(),
                    quarto: suite,
                    tempo: tempo,
                    camareira: ""
                }
                localStorage.setItem("limpeza", JSON.stringify(dados))
            }, 500)
        }
    } else if (status == acao[6]) {
        alert('Camareira Selecionada')
        stop[suite]()
        clean[suite](suite)
        setTimeout(() => {
            var re = JSON.parse(localStorage.getItem("limpeza"))
            var ca = $("#selecionar_camareira").val()
            envia_dados_limpeza(re.caixa, re.data, re.hora, re.quarto, re.tempo, ca)
        }, 200)
        setTimeout(() => { fimModal() }, 500)
        setTimeout(() => { desfazer(suite, flags[0], flags[1], flags[2]) }, 600)

        setTimeout(() => {
            desligar_luz(suite)
            localStorage.setItem("luz", "desligada")
        }, 650)

        setTimeout(() => { ultima_limpeza(suite) }, 800)
        setTimeout(() => { localStorage.removeItem("limpeza") }, 850)
        setTimeout(() => { localStorage.removeItem(`_${suite}`) }, 850)
        setTimeout(() => { fechar_cofre(suite) }, 1000)
        setTimeout(() => { encerrar_tarefas(suite) }, 1000)
    } else if (status == acao[7]) {
        $("#acoes3").val("Ligar Luz")
        desligar_luz(suite)
        localStorage.setItem("status_botao", "desligado")
        localStorage.setItem("luz", "desligada")
    } else if (status == acao[8]) {
        registraLimiteManutencao(suite, "a", "manutencao")
        $("#acoes").val("Apagar Luz")
        ligar_luz(suite)
        localStorage.setItem("status_botao", "ligado")
        localStorage.setItem("luz", "ligada")
    } else if (status == acao[9]) {
        fimModal()
        abrirMenu("modau-menu")
        camareira_faxina(suite)
        listar_camareiras()
    } else if (status == acao[10]) {
        if (confirm(`Disponibilizar a Suíte ${suite}?`)) {
            stop[suite]()
            clean[suite](suite)
            let camareira = $("#camareiras :selected").text()
            setTimeout(() => { ultima_limpeza(suite) }, 200)
            setTimeout(() => { desfazer(suite, flags[0], flags[1], flags[2]) }, 500)
            setTimeout(() => { fimModal() }, 700)
            setTimeout(() => { envia_dados_faxina(usuario, data_atual(), hora_atual(), suite, tempo, camareira) }, 900)
            setTimeout(() => { fecharMenu() }, 1000);
            if (verificaoLuz == "ligada"){
                setTimeout( () => {
                    desligar_luz(suite)
                    localStorage.setItem("luz", "desligada")
                }, 500)
            }
            setTimeout(() => { encerrar_tarefas(suite) }, 1000)
        }
    }
}
