
//strict mode
"use strict"
// on recupère les données
function ajaxGet(url, callback){
    let request = new XMLHttpRequest();
    request.open("GET", url);

    request.addEventListener("load", function () {
        if (request.status >= 200 && request.status < 400) { // traitement de la requete réusssi
            callback(request.responseText);
        } else {
            // Affichage des informations sur l'échec du traitement de la requête
            console.error(request.status + " " + request.statusText);
        }
    })
}