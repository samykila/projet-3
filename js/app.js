

   
        // creation des boucles pour les différentes stations
        for (station in response) {
            let  marker = new L.marker([response[station].position.lat, response[station].position.lng]);// pas de addTo(macarte), l'affichage sera géré par la bibliothèque des clusters

            const elt = document.getElementById('formulaire');    // On récupère l'élément sur lequel on veut détecter le clic
            marker.addEventListener('click', function() {
                lastation = response[station];
                console.log(lastation.name);   // On écoute l'événement click
                let form = document.querySelector("form");
                let station = document.getElementById('station').value = lastation.name;
                let address = document.getElementById('address').value = lastation.address;
                let disponibility = document.getElementById('disponibility').value = lastation.disponibility;

            });
            