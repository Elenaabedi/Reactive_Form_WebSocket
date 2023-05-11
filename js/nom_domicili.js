/*
Nom. No pot estar buit.
*/

function notEmpty() {
    let elem = document.getElementById(this.id);
    var resultat = elem.value.length == 0;
    var error = this.id + '_error';
    if(resultat){
        document.getElementById(error).innerHTML="El "+ this.id+" és obligatori."
    } else {
        document.getElementById(error).innerHTML=""
    }
}

