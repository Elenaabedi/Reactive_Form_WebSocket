/*
Select per escollir idioma. Al canviar el seu valor es 
demanarà mitjançant $.getJSON els textes de tota la pàgina 
i s'actualitzaran. (1p)
*/

// GETJSON

function peticioCanviarIdioma() {
    let idioma = document.getElementById('idioma').value;
    let url = urlLocalhost + 'php/idiomes.php';
    url = url + '?idioma=' + idioma;

    $.getJSON(url, mostrarContent)
        .fail(function () {
            console.log("error");
        });
}

// FUNCIÓ A EXECUTAR UNA VEGADA ES FA LA CRIDA AL SERVIDOR

function mostrarContent(dades) {
    if (dades.idioma != "Error PHP") {
        document.getElementById("idioma_error").innerHTML = "";
        document.getElementById('lidioma').innerHTML = dades['idioma'];
        document.getElementById('lnickname').innerHTML = dades['nickname'];
        document.getElementById('lnom').innerHTML = dades['nom'];
        document.getElementById('ldni').innerHTML = dades['dni'];
        document.getElementById('lprovincia').innerHTML = dades['provincia'];
        document.getElementById('lpoblacio').innerHTML = dades['municipi'];
        document.getElementById('ldomicili').innerHTML = dades['domicili'];
        document.getElementById('lmap').innerHTML = dades['ubicacio'];
    } else {
        document.getElementById("idioma_error").innerHTML = "Selecciona un idioma";
    }
}