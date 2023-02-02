import link from "../setup/index.js"
import salvar from "../olivia/salva.js"

export default function envia_dados_manutencao(caixa, data, hora, quarto, motivo, duracao) {
    var dados = { caixa: caixa, data: data, hora: hora, quarto: quarto, motivo: motivo, tempo: duracao }
    salvar(link[24], dados)
}
