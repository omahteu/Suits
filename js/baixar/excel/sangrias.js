$("#e_sangrias").click(function(e){
    e.preventDefault()
    var divTabela = document.getElementById("sangrias")
    var dados = new Blob(['\ufeff' + divTabela.outerHTML], {type:'application/vnd.ms-excel'})
    var url = window.URL.createObjectURL(dados)
    var a = document.createElement('a')
    a.href = url
    a.download = "relatorioSangrias"
    a.click()
})