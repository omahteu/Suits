import { reacao } from "./index.js"

$(document).on("click", ".inferior", function () {
    let status = $(this).val()
    let suite = $(this).attr("data-toggle")
    reacao(status, suite)
})
