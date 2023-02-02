import link from "../setup/index.js"
import salvar from "../olivia/salva.js"

export default function envia_dados_limpeza(caixa, data, hora, quarto, tempo, camareira) {
    var dados = { caixa: caixa, data: data, hora: hora, quarto: quarto, tempo: tempo, camareira: camareira }
    salvar(link[12], dados)
}
