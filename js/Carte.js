
// STRICT MODE
"use strict";

class Carte {
    constructor( lat, lng) {
        this.lat=lat;
        this.lng=lng;
    }

// on initialise la carte
    initCarte() {
        let carte = L.map('macarte').setView([this.lat, this.lng], 10);

        // on charge les tuiles pour afficher la carte
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.fr/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/"></a>',
            minZoom: 1,
            maxZoom: 20,
        })
        L.addTo(carte);
    }









