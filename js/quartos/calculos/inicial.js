import receber from "../auxiliares/funcao4.js"

export function valoresIniciais(quarto) {
    var i1 = receber("dados_suites")
    var i2 = receber("tabela_precos")

    var infosQuatos = i1.filter(e => e.numero == quarto)
    var horas_iniciais_locacao = infosQuatos[0].horas_locacao
    var valor_inicial_locacao = i2[0].valor_locacao

    var valorInicial = Number(valor_inicial_locacao) * Number(horas_iniciais_locacao)
    $("#valor-quarto").text(valorInicial)
    //$("#vq_painel").text(valorInicial)
}
