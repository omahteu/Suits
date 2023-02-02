export default function camareiras(suite){
    $(`[name=${suite}]`).css('display', 'none')
    $("#acoes2").css('display', 'none')
    $("#acoes3").css('display', 'none')
    $("#selecionar_camareira").css('display', 'inline-block')
    $("#acoes1").css({
        "display": "inline-block",
        "margin-top": "-10px"
    })
    $("#acoes1").val('OK')
}
