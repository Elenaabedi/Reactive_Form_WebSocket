/*
Dni. Es validarà que sigui correcte amb connexió $.ajax al servidor. (1p)
*/

function peticioAjaxDNI() {
    var dni = $("#dni").val();
    $.ajax({
        async: true,
        type: "POST",
        dataType: "html",
        contentType: "application/x-www-form-urlencoded",
        url: urlLocalhost + "php/dni.php",
        data: "dni=" + dni,
        beforeSend: Enviar,
        success: comprovarDNI,
        timeout: 4000,
        error: problemes
    });
    return false;
}

function comprovarDNI(dades) {
    var x = $("#missatges_error");
        x.html('');
    if (dades != '') {
        // Existe un nickname igual en la base de datos
        document.getElementById('dni_error').innerHTML = 'ERROR! El DNI és incorrecte. Format acceptat 99999999X';
    } else {
        document.getElementById('dni_error').innerHTML = '';
    }
}

// PETICIÓ HTTP REQUEST
/* function peticionAjax() {
    var peticion_http =new XMLHttpRequest();
    let url = 'http://localhost/M06/UF4/Practica_Final/php/dni.php';
    let metodo = 'POST';
    let param = "dni=" + document.getElementById('dni').value;
    peticion_http.onload = comprovarDNI;
    peticion_http.open(metodo, url, true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion_http.send((param) ? param : null);
}
*/