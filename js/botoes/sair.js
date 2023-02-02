$(document).on("click", "#btn_off", () => {
    let status = localStorage.getItem("usuarioLogado")
    if (status == "admin"){
        localStorage.removeItem("usuarioLogado")
        localStorage.removeItem("nome")
        localStorage.removeItem("caixa")
        localStorage.removeItem("permanencia")
        window.location.href = "../index.html"
    } else if (status == "caixa"){
        window.location.href = "../html/caixa.html"
    }
})

$(document).on("click", "#sair", () => {
    let status = localStorage.getItem("usuarioLogado")
    if (status == "admin"){
        localStorage.removeItem("usuarioLogado")
        localStorage.removeItem("nome")
        localStorage.removeItem("caixa")
        localStorage.removeItem("permanencia")
        window.location.href = "../index.html"
    } else if (status == "caixa"){
        window.location.href = "../html/caixa.html"
    }
})