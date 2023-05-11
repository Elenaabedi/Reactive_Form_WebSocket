/*
Ubicació. Mapa amb la ubicació del usuari, que cal actualitzar al modificar el domicili.(1p)
*/

//inicialitzem la variable map aquí per a que sigui global i poder iniciarlizar el map en el onload.
var map = '';
var coordenadesLongitud = '';
var coordenadesLatitud = '';

function peticioAjaxLocation() {
    var peticion_http = new XMLHttpRequest();
    let provincia = $('#provincia option:selected').text();
    let poblacio = $('#poblacio').val();
    let domicili = $('#domicili').val();
    if (domicili.length > 0 && poblacio.length > 0 && provincia.length > 0) {
        let url = 'https://nominatim.openstreetmap.org/search?q=' + domicili + '+' + poblacio + '+' + provincia + '+' + '&format=json&limit=1';
        let metodo = 'GET';
        peticion_http.onload = mapDomicili;
        peticion_http.open(metodo, url, true);
        peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http.send();
    }

}

function mapDomicili() {
    let params = JSON.parse(this.responseText);

    if ('0' in params) {
        if ('lon' in params[0]) {
            document.getElementById('map_error').innerHTML = ''

            coordenadesLongitud = params[0].lon;
            coordenadesLatitud = params[0].lat;

            map = map.setView([coordenadesLatitud, coordenadesLongitud], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            var marker = L.marker([coordenadesLatitud, coordenadesLongitud]).addTo(map);
        } else {
            document.getElementById('map_error').innerHTML = 'Aquesta direcció no es troba.'
        }
    } else {
        document.getElementById('map_error').innerHTML = 'Aquesta direcció no es troba.'
    }

}