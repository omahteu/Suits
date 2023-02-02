import { buscaLocacoes } from "../auxiliares/funcao1.js"
import { buscaSuites } from "../auxiliares/funcao2.js"
import { buscaPrecos } from "../auxiliares/funcao3.js"

$(document).ready(function(){
    setInterval(() => {
        buscaLocacoes()
        buscaSuites()
        buscaPrecos()
    }, 1000);
})