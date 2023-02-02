import link from "../setup/index.js"
import { registro_movimento } from "../cadastros/postMovimentos.js"
import { data_atual } from "../geradores/data.js"
import alterar from "../olivia/altera.js"

$(document).on("click", "#SalvarMovimentoEstoque", function () {
    var escolha_movimento = $("#acao_movimentacao").val()
    var quantidade_movimento = $("#quantidadeProduto").val()
    if (escolha_movimento == "" || quantidade_movimento == "") {
        alert("Campos Inválidos!")
    } else if (escolha_movimento == "entrada") {
        let id = $("#idx").text()
        var quantidade_base = $("#quantidadex").text()
        let quantidade_atualizada = parseInt(quantidade_movimento) + parseInt(quantidade_base)
        let cod = $("#codigoProduto").text()
        let nome = $("#usuario_sistema").text()
        let desc = $("#descricaoProduto").text()
        let vun = $("#valorUnitarioProduto").text()
        let cat = $("#categoriaProduto").text()
        let dat = $("#datax").text()
        let datm = data_atual()
        let url = `${link[16]}${id}/`
        let data = {
            codigo: cod,
            descricao: desc,
            valorunitario: vun,
            quantidade: quantidade_atualizada,
            categoria: cat,
            data: dat
        }
        alterar(url, data)
        registro_movimento(datm, nome, cod, escolha_movimento, quantidade_movimento)
        setTimeout(() => {
            location.reload()
        }, 1000)

    } else if (escolha_movimento == "saida") {
        let id = $("#idx").text()
        var quantidade_base = $("#quantidadex").text()
        let quantidade_atualizada = parseInt(quantidade_base) - parseInt(quantidade_movimento)
        let cod = $("#codigoProduto").text()
        let nome = $("#usuario_sistema").text()
        let desc = $("#descricaoProduto").text()
        let vun = $("#valorUnitarioProduto").text()
        let cat = $("#categoriaProduto").text()
        let dat = $("#datax").text()
        let datm = data_atual()
        let url = `${link[16]}${id}/`
        let data = {
            codigo: cod,
            descricao: desc,
            valorunitario: vun,
            quantidade: quantidade_atualizada,
            categoria: cat,
            data: dat
        }
        alterar(url, data)
        registro_movimento(datm, nome, cod, escolha_movimento, quantidade_movimento)
        setTimeout(() => {
            location.reload()
        }, 1000)
    }
})
