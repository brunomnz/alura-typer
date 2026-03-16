var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();
var cronometroID;

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
});


function atualizaTamanhoFrase() {

    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {

    campo.on("input", function () {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);

    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();

    campo.one("focus", function () {
        cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    clearInterval(cronometroID);
    campo.addClass("campo-desativado");
    campo.addClass("perdeu")
    inserePlacar();
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length)
        console.log("Digitado: " + digitado);
        console.log("Comparavel: " + comparavel);
        if (frase.startsWith(digitado)) {
            console.log("CORRETO")
            campo.removeClass("borda-vermelha");
            campo.addClass("borda-verde");
            if (digitado.length == frase.length) {
                campo.removeClass("borda-vermelha");
                campo.removeClass("borda-verde");
                campo.addClass("venceu");
                console.log("VENCEU")
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.addClass("campo-desativado");
                inserePlacar();
            }
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
            console.log("Errado")
        }
    })
}



function reiniciaJogo() {
    clearInterval(cronometroID);
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");

    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
    campo.removeClass("venceu");
    campo.removeClass("perdeu");
}