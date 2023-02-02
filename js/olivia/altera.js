const mensagem = "[SUCESSO] | Olivia alterou todos os dados solicitados!"
export default function alterar(link, dados){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: link,
        type: 'PATCH',
        data: JSON.stringify(dados),
        success: function () {
            sessionStorage.removeItem("fichas")
            console.log(mensagem)
        },
        error: function (textStatus, errorThrown) {
            sessionStorage.setItem("altera.js", `[LOGS] | ${textStatus} - ${errorThrown}`)
        }
    })
}
