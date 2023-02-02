import link from "../../setup/index.js"
import alterar from "../../olivia/altera.js"

$(document).ready(function () {
    $.get(link[33], (e) => {
        debito(e)
        credito(e)
        dinheiro(e)
        sangrias()
    })
})

async function dinheiro(e) {

    let tab = document.getElementById("tab_saldo")
    tab.innerHTML = ""

    const rq = await fetch(link[30])
    const rs = await rq.json()
    const valor = parseFloat(rs[0].caixa)
    console.log(valor)
    tab.innerHTML += '<tr>' +
        `<td>${valor.toFixed(2)}</td>` +
        '</tr>'

    // ULTILIDADE 2

    alterar(`${link[30]}${31}/`, {caixa: valor})
}

function debito(e) {
    var debito = e.filter(e => e.forma.slice(0, 3) == "Déb")
    let tab = document.getElementById("tab_debito")
    tab.innerHTML = ""
    debito.forEach(i => {
        tab.innerHTML += '<tr>' +
            `<td>${'i.nota'}</td>` +
            `<td>${parseFloat(i.valor).toFixed(2)}</td>` +
            '</tr>'
    })
}

function credito(e) {
    var credito = e.filter(e => e.forma.slice(0, 3) == "Cré")
    let tab = document.getElementById("tab_credito")
    tab.innerHTML = ""
    credito.forEach(i => {
        tab.innerHTML += '<tr>' +
            `<td>${'i.nota'}</td>` +
            `<td>${parseFloat(i.valor).toFixed(2)}</td>` +
            `<td>${i.parcela}</td>` +
            '</tr>'
    })
}

async function sangrias() {
    let tab = document.getElementById("tab_sangria")
    tab.innerHTML = ""
    const rq = await fetch(link[32])
    const rs = await rq.json()
    rs.forEach(e => {
        tab.innerHTML += '<tr>' +
            `<td>${e.usuario}</td>` +
            `<td>${e.dia}</td>` +
            `<td>${e.hora}</td>` +
            `<td>${e.valor}</td>` +
            `<td>${e.ac}</td>` +
            `<td>${e.ns}</td>` +
            '</tr>'
    });
}
