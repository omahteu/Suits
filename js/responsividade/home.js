function layout() {
    if (window.matchMedia("(max-width:768px)").matches) {
        setTimeout(() => {
            $("#tabelas_relatorios").removeClass("span12A").addClass("span12");
            $("#btn_principal").css("display", "none")
            $("#sair").css("display", "none")
            $("#desktop").css("display", "none")
            $("#botao_hub").css("display", "none")
        }, 170);
    } else {
        $("#sidebar").css("display", "none")
    }
}
