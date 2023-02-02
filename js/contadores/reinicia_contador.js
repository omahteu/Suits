import link from "../setup/index.js"
import { hora_atual_segundos } from "../geradores/hora.js"
import { play } from "../setup/start_relogios.js"

$(document).ready(function () {
    reiniciando()
})

function reiniciando() {
    setTimeout(() => {
        $.get(link[11], e => {
            e.forEach(el => {
                let inicio = el.datahora
                let tipo = el.tipo
                let suite = el.quarto
                if (tipo != "aguardando") {
                    let agora = hora_atual_segundos()
                    var ms = moment(agora, "HH:mm:ss").diff(moment(inicio, "HH:mm:ss"));
                    var d = moment.duration(ms);
                    var tempoPassado = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                    var stp = tempoPassado.split(":")
                    play[suite](suite, stp[0], stp[1], stp[2])
                } else {
                    let pausado = localStorage.getItem(`_${suite}`)
                    $(`#hora${suite}`).text(pausado.split(",")[0])
                    $(`#minuto${suite}`).text(pausado.split(",")[1])
                    $(`#segundo${suite}`).text(pausado.split(",")[2])
                }
            });
        })
    }, 1000);
}
