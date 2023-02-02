import link from "../setup/index.js"
import { hora_atual_segundos } from "../geradores/hora.js"
import pernoite from "../tags/pernoite.js"
import { tick } from "../setup/box.js"
import { insereValor } from "./ajax/inserir.js"
import receber from "../quartos/auxiliares/funcao4.js"
import alterar from "../olivia/altera.js"

$(document).ready(function () {
    setInterval(() => {
        _pernoite()
    }, 1000)
})

async function _pernoite() {
    const ux = []
    const i1 = JSON.parse(sessionStorage.getItem("dados_suites"))
    const i2 = JSON.parse(sessionStorage.getItem("tabela_precos"))

    const rq = await fetch(link[35])
    const rs = await rq.json()

    rs.forEach(e => {

        let tipo = e.tipo
        let permanencia = parseInt(e.permanencia)
        let seAutomatica = tipo == "Automática"
        let seFixa = tipo == "Fixa"

        if (seAutomatica) {
            $.get(link[11], (el) => {
                el.forEach(ele => {
                    let id = ele.id
                    let suite = ele.quarto
                    let hora = ele.datahora
                    let valor = ele.valor
                    let tipo = ele.tipo
                    let condicaoTres = tipo != "pernoite"

                    if (condicaoTres) {
                        let tempoTolerancia = i1.filter(i => i.numero == suite)
                        let minutoTolerancia = parseInt(tempoTolerancia[0].tolerancia)
                        let valorpernoite = i2[0].tempo_pernoite

                        let agora = hora_atual_segundos()
                        let datahoraLocacao = ele.datahora
                        var ms = moment(agora, "HH:mm:ss").diff(moment(datahoraLocacao, "HH:mm:ss"));
                        var d = moment.duration(ms);
                        var tempoPassado = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                        let horaPassada = parseInt(tempoPassado.slice(0, 2).split(/\D+/).join(""), 10)
                        let minutoPassado = parseInt(tempoPassado.slice(2, 4))

                        let condicaoQuatro = minutoPassado > minutoTolerancia
                        let condicaoCinco = horaPassada >= permanencia

                        var mensagem = `[SUCESSO] | Pernoite na Suíte ${suite} ativada às ${hora_atual_segundos()}!`

                        condicaoCinco && condicaoQuatro ? valor_jaexiste(id, suite, hora, valor, valorpernoite, mensagem) : ""

                        /*
                        if (condicaoQuatro && condicaoCinco && condicaoSeis) {
                            pernoite(suite, flags[0], flags[1], flags[2])
                            var dados = {
                                datahora: hora,
                                valor: valor,
                                quarto: suite,
                                tipo: "pernoite"
                            }
                            $.ajax({
                                url: `${link[11]}${id}/`,
                                type: "PUT",
                                dataType: "json",
                                data: dados,
                                success: () => { console.log(mensagem) }
                            })
                            insereValor(suite, valorpernoite, "pernoite")
                        } else if (condicaoSete) {
                            pernoite(suite, flags[0], flags[1], flags[2])
                            var dados = {
                                datahora: hora,
                                valor: valor,
                                quarto: suite,
                                tipo: "pernoite"
                            }
                            $.ajax({
                                url: `${link[11]}${id}/`,
                                type: "PUT",
                                dataType: "json",
                                data: dados,
                                success: () => { console.log(mensagem) }
                            })
                        }
                        */
                    }
                })
            })
        } else if (seFixa) {
            let base = receber("offs")
            base.forEach(e => {
                ux.push(e.quarto)
                let cd1 = e.tipo != "pernoite"
                if (cd1) {
                    let precoper = parseInt(i2[0].tempo_pernoite)
                    let start = e.datahora

                    $.get(link[35], r => {
                        let inici = `${r[0].inicio}:00`
                        let fim = `${r[0].fim}:00`

                        let if1 = String(hora_atual_segundos()).slice(0, 2)
                        let if2 = inici.slice(0, 2)
                        let if3 = start.slice(3, 5)
                        let if4 = inici.slice(3, 5)
                        let if5 = fim.slice(0, 2)

                        let cd2 = if1 >= if2
                        let cd3 = if3 > if4
                        let cd4 = if1 < if5

                        cd2 && cd3 && cd4? ativa(e.id, e.quarto, e.datahora, e.valor, precoper) : ""
                    })
                }
            })
        }
    })
}

function valor_jaexiste(id, suite, hora, valor, valorpernoite) {
    $.get(link[36], e => {
        let existe = e.filter(e => e.suite == suite && e.tipo == "pernoite")
        if (existe.length == 0) {
            let f = tick[`${suite}`]
            pernoite(suite, f[0], f[1], f[2])
            var dados = { datahora: hora, valor: valor, quarto: suite, tipo: "pernoite" }
            alterar(`${link[11]}${id}/`, dados)
            insereValor(suite, valorpernoite, "pernoite")
        } else {
            console.log("abacaxi")
        }
    })
}

function ativa(id, suite, hora, valor, valorpernoite) {
    let f = tick[`${suite}`]
    pernoite(suite, f[0], f[1], f[2])
    var dados = { datahora: hora, valor: valor, quarto: suite, tipo: "pernoite" }
    alterar(`${link[11]}${id}/`, dados)
    insereValor(suite, valorpernoite, "pernoite")
}
