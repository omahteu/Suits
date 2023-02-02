import { abrirMenu } from "../../configuracoes/exibicoes/menu.js"

$(document).on("click", "#nu_adicionar", function(){
    let usuario = $("#nu_usuario").val()
    let senha = $("#nu_senha").val()
    let vencimento = $("#nu_vencimento :selected").text()

    if (usuario.length != 0 && senha.length != 0 && String(vencimento) != " Vencimento"){
        abrirMenu("modau-menu")
        var menu = document.forms.namedItem("menu").id
        $(`#${menu}`).html('')
        $(`#${menu}`).append(
            `<h1>Sucesso!</h1>`+
            `<h3>Usuário | <span class='nu_info'>${usuario}</span></h3>`+
            `<h3>Senha | <span class='nu_info'>${senha}</span></h3>`+
            `<h3>Vencimento | <span class='nu_info'>${vencimento}</span></h3>`
        )
    } else {
        alert("Campos Incorretos")
    }
})
