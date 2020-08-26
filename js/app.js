
// recuperation des stations + creation des marqueurs

ajaxGET("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=a1bb8a2d6bce79ce80f96e68686478140bfc9616");
function (response) {
    let butRes = document.getElementById("butReservation");
    const listeStations = JSON.parse(response);

listeStations.forEach(station => {
    let myGreenIcon = L.icon({
        iconUrl: "images/greenMark.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [-3, -76],
    });

    let  myRedIcon = L.icon({
        iconUrl: "images/redMark.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [-3, -76],
    });

    let  marker ="";
    if (station.status === "OPEN") {
        marker = L.marker([station.position.lat,station.position.lng], { icon: myGreenIcon }).addTo(carte);
    }
    else {
        marker = L.marker([station.position.lat,station.position.lng], { icon: myRedIcon }).addTo(carte);
    }

    //Affichage des infos de la station lors d'un clic sur son marker
    marker.addEventListener("click", function() {
        document.getElementById("infoStations").classList.remove("hid");
        document.getElementById("form").style.display = "none";
        let address = document.getElementById("adresseStation");
        let  state = document.getElementById("etatStation");
        let  avail = document.getElementById("veloDispo");
        let  space = document.getElementById("attacheDispo");
        let  stateStation = "";

        if (station.status === "OPEN") {
            stateStation = "Station ouverte";
        }
        else {
            stateStation = "Station fermée";
        }

        address.innerHTML = "";
        state.innerHTML= "";
        avail.innerHTML= "";
        space.innerHTML= "";

        address.innerHTML += station.address;
        state.innerHTML += stateStation;
        avail.innerHTML += station.available_bikes;
        space.innerHTML += station.available_bike_stands;

        //Nettoyage + Mise en mémoire de l'adresse de la station sélectionnée
        sessionStorage.clear();
        sessionStorage.setItem("stationAdress", station.address);

        //Vidage du canvas si déjà précédemment rempli
        canvas.clearCanvas();

        //Affichage du bouton permettant de réserver
        butRes.classList.remove("hid");
        butRes.style.display = "block";
        //Remplacement du bloc 'Info de la station' par le formulaire de réservation lors du clic sur le bouton réserver
        butRes.addEventListener("click", function(){
            document.getElementById("form").style.display = "flex";
            document.getElementById("infoStations").classList.add("hid");

            //Pré-remplissage des champs nom/prénom si une réservation a déjà été faite précédemment
            if(reservation.nom !== "") {
                document.getElementById("inputLastName").value = reservation.storedName;
                document.getElementById("inputFirstName").value = reservation.storedFName;
             }
         });
     });
  });
}