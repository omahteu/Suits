const mensagem = "[SUCESSO] | Olivia salvou todos os dados solicitados!"
export default function salvar(url, dados){
    $.post(url, dados, () => {
        console.log(mensagem)
    })
}
