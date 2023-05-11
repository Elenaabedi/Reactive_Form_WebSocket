/*
Select Població. S'omplirà mitjançant ajax, al modificar la Província. (1p)
*/

function peticionAjaxPoblacio() {
    var prov = $("#provincia").val();
   
    var peticion_http =new XMLHttpRequest();
    let url = urlLocalhost + 'php/cargaMunicipisJSON.php?provincia=' + prov;
    let metodo = 'GET';
    peticion_http.onload = tornadaPoblacions;
    peticion_http.open(metodo, url, true);
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion_http.send();
}

function tornadaPoblacions() {
    var x = $("#missatges_error");
    x.html('');

    let JSONparse = JSON.parse(this.responseText);
    
    let output = '<option>Selecciona un municipi</option>';

    for (const key in JSONparse) {
        output += '<option>';
        output += JSONparse[key]
        output += '</option>';
    }

    $("#poblacio").html(output);

}

