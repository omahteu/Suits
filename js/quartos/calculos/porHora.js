import { hora_atual_segundos } from "../../geradores/hora.js"
import { alterarValor } from "../ajax/alterar.js"
import receber from "../auxiliares/funcao4.js"

export default function atualizaValores(suite) {
  try {
    var i1 = receber("offs")
    var i2 = receber("dados_suites")
    var i3 = receber("tabela_precos")

    var foffs = i1.filter(e => e.quarto == suite)
    var fsuit = i2.filter(e => e.numero == suite)

    var loc = fsuit[0].horas_locacao
    var cob = fsuit[0].cobranca
    var tol = fsuit[0].tolerancia

    var dat = foffs[0].datahora
    var val = foffs[0].valor

    var agora = hora_atual_segundos()
    var subtr = moment(agora, "HH:mm:ss").diff(moment(dat, "HH:mm:ss"))
    var parsi = moment.duration(subtr)
    var passo = Math.floor(parsi.asHours()) + moment.utc(subtr).format(":mm:ss")

    var passado = String(passo).split(":")
    var locacao = i3[0].valor_locacao
    var horaLo = passado[0]
    var minuto = passado[1]

    let c1 = parseInt(horaLo) > parseInt(loc)
    let c2 = parseInt(horaLo) == parseInt(loc) + 1
    let c3 = parseInt(minuto) > parseInt(tol)
    let c4 = parseInt(horaLo) > parseInt(loc) + 1
    let c5 = parseInt(horaLo) - parseInt(loc)

    if (cob == "hora") {
      let h1 = i3[0].vh1
      let h2 = i3[0].vh2
      let h3 = i3[0].vh3
      let h4 = i3[0].vh4
      let h5 = i3[0].vh5
      let h6 = i3[0].vh6

      if (c1 && c2 && c3) {
        c5 == 1 ? alterarValor(suite, parseFloat(val) + parseInt(h1)) : 
        c5 == 2 ? alterarValor(suite, parseFloat(val) + parseInt(h2)) : 
        c5 == 3 ? alterarValor(suite, parseFloat(val) + parseInt(h3)) : 
        c5 == 4 ? alterarValor(suite, parseFloat(val) + parseInt(h4)) : 
        c5 == 5 ? alterarValor(suite, parseFloat(val) + parseInt(h5)) : 
        c5 == 6 ? alterarValor(suite, parseFloat(val) + parseInt(h6)) : ""
        if (c5 > 7) {
          for (const x of Array(7).keys()) {
            var i = x + 1
            var valoracrescentado = parseFloat(locacao) * i
            var acrescimo = parseFloat(val) + parseFloat(valoracrescentado)
            alterarValor(suite, acrescimo)
          }
        }
      } else if (c4 && c3) {
        c5 == 1 ? alterarValor(suite, parseFloat(val) + parseInt(h1)) : 
        c5 == 2 ? alterarValor(suite, parseFloat(val) + parseInt(h2)) : 
        c5 == 3 ? alterarValor(suite, parseFloat(val) + parseInt(h3)) : 
        c5 == 4 ? alterarValor(suite, parseFloat(val) + parseInt(h4)) : 
        c5 == 5 ? alterarValor(suite, parseFloat(val) + parseInt(h5)) : 
        c5 == 6 ? alterarValor(suite, parseFloat(val) + parseInt(h6)) : ""
        if (c5 > 7) {
          for (const x of Array(7).keys()) {
            var i = x + 1
            var valoracrescentado = parseFloat(locacao) * i
            var acrescimo = parseFloat(val) + parseFloat(valoracrescentado)
            alterarValor(suite, acrescimo)
          }
        }
      }
    } else if (cob == "fixa") {
      if (parseInt(horaLo) >= 1 && parseInt(minuto) > parseInt(tol)) {
        var resultado = parseInt(horaLo) * parseFloat(locacao)
        alterarValor(suite, resultado)
      }
    }
  } catch (error) {
    sessionStorage.setItem("porHora.js", `[LOGS] | ${error}`)
  }
}
