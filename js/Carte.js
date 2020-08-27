
// STRICT MODE
"use strict";

class Carte {
    constructor (lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }

// on initialise la carte
    initCarte () {
        let carte = L.map('macarte').setView([this.lat, this.lng], 10);

        // on charge les tuiles pour afficher la carte
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            minZoom: 2,
            maxZoom: 20,
        }).addTo(carte);
    }
}









