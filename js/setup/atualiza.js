import link from "./index.js"
import { hora_atual_segundos } from "../geradores/hora.js"
import alterar from "../olivia/altera.js"

export default function atualiza_status(suite, status) {
    let onze = JSON.parse(sessionStorage.getItem("offs"))
    let dados = onze.filter(i => i.quarto == suite)
    let id = dados[0].id
    let url = `${link[11]}${id}/`
    let data = {tipo: status}
    alterar(url, data)
}
