import formata from "./complemento.js";

"use strict";

let hora
let minuto
let segundo
let msegundo = 0
let contagem;
let suite

export function inicia43(id, h, m, s) {
    suite = id
    hora = parseInt(h)
    minuto = parseInt(m)
    segundo = parseInt(s)
    para43();
    contagem = setInterval(() => { corre43(suite); }, 10);
}

export function para43() {
    clearInterval(contagem);
}

export function zera43(suite) {
    hora = 0;
    minuto = 0;
    segundo = 0;
    msegundo = 0;
    document.getElementById(`hora${suite}`).innerText = '00';
    document.getElementById(`minuto${suite}`).innerText = '00';
    document.getElementById(`segundo${suite}`).innerText = '00';
}

export function corre43(suite) {
    if ((msegundo += 10) == 1000) {
        msegundo = 0;
        segundo++;
    }
    if (segundo == 60) {
        segundo = 0;
        minuto++;
    }
    if (minuto == 60) {
        minuto = 0;
        hora++;
    }
    document.getElementById(`hora${suite}`).innerText = formata(hora);
    document.getElementById(`minuto${suite}`).innerText = formata(minuto);
    document.getElementById(`segundo${suite}`).innerText = formata(segundo);
}
