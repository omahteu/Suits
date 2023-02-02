export default function Suitesdisponiveis() {
    let offs = JSON.parse(sessionStorage.getItem("offs"))
    let suite = JSON.parse(sessionStorage.getItem("dados_suites"))
    let suites = []
    offs.forEach(o => {
        suites.push(o.quarto)
    });
    $("#quartos_disponiveis").empty()
    suite.forEach(il => {
        if (suites.includes(il.numero) == false) {
            $("#quartos_disponiveis").append(`<option>${il.numero}</option>`)
        }
    });
}
