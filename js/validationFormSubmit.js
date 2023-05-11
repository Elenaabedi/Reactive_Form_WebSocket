// SUBMIT FORM VALIDATOR

function formValidator(e) {
    // Make quick references to our fields
    var idioma = document.getElementById("idioma");
    var nickname = document.getElementById("nickname");
    var nom = document.getElementById("nom");
    var dni = document.getElementById("dni");
    var provincia = document.getElementById("provincia");
    var poblacio = document.getElementById("poblacio");
    var domicili = document.getElementById("domicili");

    var noValid = null;
    // Check each input in the order that it appears in the form!
    if (!validateSelect(idioma) && !noValid) noValid = idioma;
    if (!validateIput(nickname) && !noValid) noValid = nickname;
    if (!validateIput(nom) && !noValid) noValid = nom;
    if (!validateIput(dni) && !noValid) noValid = dni;
    if (!validateSelect(provincia) && !noValid) noValid = provincia;
    if (!validateSelect(poblacio) && !noValid) noValid = poblacio;
    if (!validateIput(domicili) && !noValid) noValid = domicili;

   if (noValid) {
        noValid.focus();
        e.preventDefault();
    } else {
        let buttonConnect = document.getElementById('connect');
        buttonConnect.disabled = false;
    } 

    return true;

}

function validateIput(elem) {

    let err = elem.id + '_error';
    let error_value = document.getElementById(err).innerHTML;
    let substring = '';
    if (error_value != '') {
        substring = error_value.substring(0, 5)
    };

    if (elem.value != '') {
        if (error_value == '' || substring != 'ERROR') {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function validateSelect(elem) {

    let index = document.getElementById(elem.name).selectedIndex;
    var resultat = index != '';

    return resultat;

}

