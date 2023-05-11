// Onload

window.onload = function () {
    peticionAjaxProvincia();
    map = new L.map('map');

    document.getElementById('dni').addEventListener('change', peticioAjaxDNI);
    document.getElementById('idioma').addEventListener('change', peticioCanviarIdioma);
    document.getElementById('nickname').addEventListener('change', peticioObtenirNicknames);
    document.getElementById('nom').addEventListener('change', notEmpty);
    document.getElementById('provincia').addEventListener('change', peticionAjaxPoblacio);
    document.getElementById('domicili').addEventListener('change', notEmpty);
    document.getElementById('provincia').addEventListener('change', peticioAjaxLocation);
    document.getElementById('poblacio').addEventListener('change', peticioAjaxLocation);
    document.getElementById('domicili').addEventListener('change', peticioAjaxLocation);
    document.getElementById('formulari').addEventListener('change', formValidator);
    document.getElementById('connect').addEventListener('click', wsocketConectar);
    document.getElementById('disconnect').addEventListener('click', wsocketDesconectar);
    document.getElementById('enviar').addEventListener('click', wsocketSend);

}

// Rellotge

function Enviar() {
    var x = $("#missatges_error");
    x.html('<img id="rellotge" src="img/ajax_wait.gif" alt="Temps de resposta"></img>');
}

// Funció problemes al servidor

function problemes() {
    $("#missatges_error").text('Problemes al servidor.');
}

