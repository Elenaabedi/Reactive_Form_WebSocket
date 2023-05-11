/*
Nickname. Al modificar el contingut (de com a mínim amb una lletra), 
es mostraran el nicknames ja existents que comencin per aquest 
contingut. Si el nickname ja existeix es mostrarà l'error en un span. (1p)
*/

// GETJSON

function peticioObtenirNicknames() {
    let nickname = document.getElementById('nickname').value;
    // http://localhost/M06/UF4/Practica_Final/php/llistaNicknames.php?nickname=antero
    let url = urlLocalhost + 'php/llistaNicknames.php';
    let data = `nickname=${nickname}`; // Quan es tracta d'un fetch POST, no hem de ficar el '?'

    fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: data
    }).then(function (response) {
        if (response.ok) {
            response.text().then(contrastarNicknames)
        } else {
            document.getElementById('missatges_error').innerHTML = `Status: ${response.status} ${response.statusText}`;
        }
    })
        .catch(function (error) {
            document.getElementById('missatges_error').innerHTML = 'Hubo un problema con la petición Fetch:' + error.message;
        });
}

function contrastarNicknames(dades) {

    if (dades == '1') {
        // Existe un nickname igual en la base de datos
        document.getElementById('nickname_error').innerHTML = 'ERROR! Aquest nom ja existeix.';
    } else if (dades != '2' && dades != '1') {
        // No existe ninguna coincidencia
        document.getElementById('nickname_error').innerHTML = dades;
    } else {
        document.getElementById('nickname_error').innerHTML = "";

    }
}

