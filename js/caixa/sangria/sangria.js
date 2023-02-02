import link from "../../setup/index.js"

const sangria = '<form action="" method="post" class="form-horizontal">'+
                    '<div class="control-group sangria">'+
                        '<div class="controls">'+
                            '<input type="text" id="retirada" placeholder="Valor Retirado">'+
                        '</div>'+
                    '</div>'+

                    '<div class="form-actions sangria">'+
                        '<div class="span8">'+
                            '<div class="span9">'+
                                '<button type="button" class="button btn btn-primary" id="retirarSangria">'+
                                    '<span class="button__icon">'+
                                        '<i class="fa-solid fa-floppy-disk"></i>'+
                                    '</span>'+
                                    '<span class="button__text2">Retirar</span>'+
                                '</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</form>'

$(document).ready(function(){
    retorna_valor_caixa()
    retorna_teto_caixa()
    setTimeout( () => {
        let usuario = localStorage.getItem("usuarioLogado")
        if (usuario != "caixa"){
            let i1 = sessionStorage.getItem("diaCaixa")
            let i2 = sessionStorage.getItem("teto")
            console.log(parseFloat(i1) > parseFloat(i2))
            if (parseFloat(i1) > parseFloat(i2)){
                alert("Realizar Sangria!")
                $("#caixa").append(sangria)
                $(".sangria").css("visibility", "visible")
            }
        }
    }, 1000)
})

async function retorna_valor_caixa(){
    try {
        const rq = await fetch(link[30])
        const rs = await rq.json()
        const valor = parseFloat(rs[0].caixa)
        sessionStorage.setItem("diaCaixa", valor)
        
    } catch (error) {
        sessionStorage.setItem("sangria.js", `[LOGS] | ${error}`)
    }
}

async function retorna_teto_caixa(){
    const rq = await fetch(link[31])
    const rs = await rq.json()
    sessionStorage.setItem("teto", rs[0].teto)
}
