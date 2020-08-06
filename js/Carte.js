
// STRICT MODE
"use strict";
class carte{
    constructor() {
        this.init,
            this.tilelayer,
            this.reservation;
    }
};

// on initialise la carte
    var carte = L.map('macarte').setView([45.7578137,4.8320114], 8);

// on charge les tuiles pour afficher la carte
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',{
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.fr/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/"></a>',
    minZoom:1,
    maxZoom:20,
})

.addTo(carte);
// pour determiner un zoom par defaut
var tableauMarkers =[];

// création des clusters
        var markerClusters = L.markerClusterGroup();
        markerClusters.addLayer(marker); // Nous ajoutons le marqueur aux groupes
        tableauMarkers.push(marker);// on ajoute les marqueurs au tableau
    }
    var groupe = new L.featureGroup(tableauMarkers);// on ajoute les marqueurs dans un groupe leaflet
    carte.fitBounds(groupe.getBounds().pad(5.0)); // on adapte le Zoom
}
carte.addLayer(markerClusters); //markerClusters.addTo(carte);
};
request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=a1bb8a2d6bce79ce80f96e68686478140bfc9616");
request.setRequestHeader("Content-Type", "application/json");
request.send();

