import link from "../setup/index.js"
import apagar from "../olivia/apaga.js"
import receber from "../quartos/auxiliares/funcao4.js"

export default function ultima_limpeza(suite){
    localStorage.removeItem("dadosQuarto")
    localStorage.removeItem(`codigo${suite}`)
    localStorage.removeItem("quarto")
    let onze = receber("offs")
    var dados = onze.filter(quartos => quartos.quarto == suite)
    var id =    dados[0].id
    let url = `${link[11]}${id}/`
    apagar(url)
    $.get(link[5], (e) => {
        var dados = e.filter(quartos => quartos.quarto == suite)
        dados.forEach(e => {
            let url = `${link[5]}${e.id}/`
            apagar(url)
        });
    })
}
