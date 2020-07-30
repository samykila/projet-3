class Signature {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.signature = document.getElementById("signature");
        this.btn-resevation = document.getElementById("btn-resevation");
        this.rest = document.getElementById("reset");

        this.dessin = null; // Il nous faut un parametre variable permettant Ã  l'application de dessiner ou non
        this.ctx = this.canvas.getContext("2d") // Pour definir le contexte 2D du canvas lors de l'initialisation de la methode "dessiner"

        this.ecouteurClicStation = document.addEventListener("clicMarqueur", (e) => { // Un ecouteur integre reactif a chaque clic sur une station pour effacer le canvas
            this.reinitialiser();
        });

        this.ecouteurNouvelleAnnulation = document.addEventListener("nouvelleAnnulation", (e) => { // Un ecouteur integre reactif a chaque nouvelle annulation
            this.reinitialiser();
        });
    };

    getPosition(e) { // Une methode de la classe pour recuperer les coordonnees exactes du pointeur en fonction du type de l'event (touch or mouse)
        var typeE = e.type;
        var rect = this.canvas.getBoundingClientRect(); // Permet de prendre en compte l'emplacement de l'objet par rapport au viewport
        if (typeE === "mousemove") {
            return {
                x: e.clientX - rect.left, // On soustrait, tres logiquement la valeur obtenue de clientX et clientY (fenetre), Ã  celle obtenue avec la methode precedente pour obtenir l'emplacement exacte du point
                y: e.clientY - rect.top
            };
        } else {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        };
    };

    movePosition(e) { // Specifique a la souris
        var positionSouris = this.getPosition(e);
        var positionX = positionSouris.x;
        var positionY = positionSouris.y;
        this.dessiner(positionX, positionY);
    };

    transformEvent(e) { // Il s'agit dans cette methode de convertir les evenements de type "touch" en type "mouse"
        var typeE = e.type;
        if (typeE === "touchstart") {
            var mouseEvent = new MouseEvent("mousedown", {}); // "touchstart" devient un "mousedown" grace a la puissance de Son Goku
            this.canvas.dispatchEvent(mouseEvent); // Methode qui distribue le nouvel event
        } else if (typeE === "touchend") {
            var mouseEvent = new MouseEvent("mouseup", {}); // "touchend" devient un "mouseup" (toujours grace a ce bon vieux Saiyan)
            this.canvas.dispatchEvent(mouseEvent);
        } else if (typeE === "touchmove") {
            var touch = e.touches[0]; // Le premier doigt
            var mouseEvent = new MouseEvent("mousemove", { // "touchmove" devient un "mousemove" (grace a qui ?)
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        };
    };

    startDessin(e) {
        this.dessin = true; // Le parametre permettant de dessiner passant a true, notre condition dans la methode "dessiner" est realisee
        this.dessiner(e); // Ordonne d'utiliser la methode dessiner
        this.boutonreset.classList.remove("invisible");
        this.boutonConfirmerResa.classList.remove("invisible");
    };

    endDessin() { // A l'inverse de la methode precedente, on arrete le dessin
        this.dessin = false; // La methode "dessiner" s'arrete
        this.ctx.beginPath(); // Pour eviter de relier 2 dessins entre eux
    };

    dessiner(positionX, positionY) { // Notre methode moteur pour dessiner
        if(!this.dessin) return; // Si le parametre "dessin" vaut false, met automatiquement fin a la methode
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "rgb(51, 51, 51)";

        this.ctx.lineTo(positionX, positionY); // Permet de tracer une ligne entre les deux positions
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(positionX, positionY);
    };

    reinitialiser() { // Une methode pour nettoyer le canvas, trÃ¨s utile et reutilisable selon plusieurs cas de figure
        this.ctx.clearRect(0, 0, 1000, 1000);
        this.boutonreset.classList.add("invisible");
        this.boutonConfirmerResa.classList.add("invisible");
    };

    initControles() {
        this.canvas.addEventListener("mousedown", this.startDessin.bind(this)); // Souris relachee : arret du dessin
        document.addEventListener("mouseup", this.endDessin.bind(this)); // L'evenement est ici place sur le document et non le canvas, sinon, si on quitte le canvas avec la souris enclenchee, lorsque l'on revient sur celui ci, il faut recliquer pour arreter le trace
        this.canvas.addEventListener("mousemove", this.movePosition.bind(this)); // Souris en deplacement : trace en cours jusqu'au prochain event "mouseup"

        this.canvas.addEventListener("touchstart", this.transformEvent.bind(this)); // On transforme les events "touch" en "mouse"
        document.addEventListener("touchend", this.transformEvent.bind(this));
        this.canvas.addEventListener("touchmove", this.transformEvent.bind(this));

        this.boutonreset.addEventListener("click", this.reinitialiser.bind(this)); // Une possibilite manuelle pour clean le canvas

        this.canvas.addEventListener("touchstart", function(e) { // Correctif pour prevenir les conflits d'events "touch" et "scroll" sur mobile
            e.preventDefault();
        }, false);
        this.canvas.addEventListener("touchend", function(e) {
            e.preventDefault();
        }, false);
        this.canvas.addEventListener("touchmove", function(e) {
            e.preventDefault();
        }, false);
    };
};
