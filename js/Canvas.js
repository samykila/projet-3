class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.signature = document.getElementById("signature");
        this.resevation = document.getElementById("btn-resevation");
        this.rest = document.getElementById("reset");

        this.dessin = null; // Il nous faut un parametre variable permettant Ã  l'application de dessiner ou non
        this.ctx = this.canvas.getContext("2d") // Pour definir le contexte 2D du canvas lors de l'initialisation de la methode "dessiner"

        this.ecouteurClicStation = document.addEventListener("clicMarqueur", (e) => { // Un ecouteur integre reactif a chaque clic sur une station pour effacer le canvas
            this.reinitialiser(),


        