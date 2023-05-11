var host = "localhost";
var urlws = `ws://${host}:8080/ws`;
var socket = new WebSocket(urlws);

// missatge rebut - mostra el missatge a div#messages
socket.onmessage = function (event) {
    let jsonParse = JSON.parse(event.data);
    if(jsonParse[0] == 'login'){
        document.getElementById('message').innerHTML += jsonParse[1] + '<br>';
        L.marker([jsonParse[3], jsonParse[2]]).addTo(map);
    } else if(jsonParse[0] == 'logout'){
        document.getElementById('message').innerHTML += jsonParse[1] + '<br>';
    } else {
        document.getElementById('message').innerHTML += jsonParse[1] + '<br>';
    }
    
}

// send message from the form
function wsocketConectar(e) {
    // Activem el botó de desconnexió i el botó per enviar missatges des del xat
    let disconnectButton = document.getElementById('disconnect');
    disconnectButton.disabled = false;

    let sendButton = document.getElementById('enviar');
    sendButton.disabled = false;

    // Obtenim les dades del formulari:
    let nick = document.getElementById("nickname").value;
    let long = coordenadesLongitud;
    let latit = coordenadesLatitud;

    // Enviem el missatge al servidor Node.js
    let outgoingMessage = { tipus: 'login', nickname: nick, longitut: long, latitut: latit };
    socket.send(JSON.stringify(outgoingMessage));

    // Activem el preventDefault per a que el formulari no s'esborri
    e.preventDefault();
    return false;
};

// Enviem missatges des del xat
function wsocketSend(e) {

    // Obtenim les dades del formulari:
    let nick = document.getElementById("nickname").value;
    let textChat = document.getElementById('chat').value;

    let outgoingMessage = { tipus: 'data', nickname: nick, text: textChat };
    socket.send(JSON.stringify(outgoingMessage));
    e.preventDefault();
    return false;
};

// Enviem un missatge al desconnectar l'usuari
function wsocketDesconectar(e) {
    // Obtenim les dades del formulari:
    let nick = document.getElementById("nickname").value;

    let outgoingMessage = { tipus: 'logout', nickname: nick};
    socket.send(JSON.stringify(outgoingMessage));
    e.preventDefault();
    socket.onclose = event => console.log(`Closed ${event.code}`);

    // Desactivem els botons de desconnexió i el botó per enviar missatges des del xat
    let disconnectButton = document.getElementById('disconnect');
    disconnectButton.disabled = true;

    let sendButton = document.getElementById('enviar');
    sendButton.disabled = true;

    return false;
};

