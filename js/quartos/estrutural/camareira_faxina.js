export default function camareira_faxina(suite){
    $("#titulo_menu").text("Menu")
    var fm = document.forms.namedItem("menu").id
    $(`#${fm}`).html("")
    $(`#${fm}`).append(
        `<select id="camareiras">`+
            `<option hidden>Camareiras</option>`+
        `</select>`+
        `<input type="button" class="btn btn-warning inferior" value="Selecionar" data-toggle=${suite}>`
    )
}
