import link from "../setup/index.js"
import salvar from "../olivia/salva.js"

export default function envia_dados_faxina(caixa, data, hora, quarto, duracao, camareira) {
    var dados = { caixa: caixa, data: data, hora: hora, quarto: quarto, tempo: duracao, camareira: camareira }
    salvar(link[23], dados)
}
