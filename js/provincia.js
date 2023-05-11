/*
Select Província. S'omplirà mitjançant ajax al carregar-se la pàgina. (1p)
*/

function peticionAjaxProvincia() {
    var peticion_http =new XMLHttpRequest();
    let prov = $('#provincia').val();
    let url = urlLocalhost + 'php/cargaProvinciasJSON.php?provincia=' + prov;
    let metodo = 'GET';
    peticion_http.onload = tornadaProvincies;
    peticion_http.open(metodo, url, true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion_http.send();
}

function tornadaProvincies() {
    
    let JSONparse = JSON.parse(this.responseText);
    let output = '<option>Selecciona una provincia</option>';

    for (const key in JSONparse) {
        output += '<option value='+ key +'>';
        output += JSONparse[key]
        output += '</option>';
    }

    $("#provincia").html(output);

}

