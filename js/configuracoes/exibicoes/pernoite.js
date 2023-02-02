import link from "../../setup/index.js"

export async function exibir_pernoite() {
    const requisicao = await fetch(link[35])
    const resposta = await requisicao.json()
    resposta.forEach(e => {
        $("#permanencia").val(e.permanencia)
        $("#inicio").val(e.inicio)
        $("#fim").val(e.fim)
        e.tipo == "Automática" ? $("#tipoPernoite").val(1) : $("#tipoPernoite").val(2)
    });
}
