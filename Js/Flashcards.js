const flashcard = document.querySelector(".flashcard");
const flashzone = document.querySelector(".flashcard_zone");
var rface = document.getElementById("recto");
var vface = document.getElementById("verso");
var count = 0;
var combien = document.getElementById("compteur");
var bdv = document.getElementById("ko");
var heal = 100;
var ecaflip;
var fanny = true;
const barre = document.querySelector(".bardevie");
const zone_bouton = document.querySelector(".bouton_zone");


/**
 * Classe Flashcards qui a pour paramètre recto et verso
 * @param recto face verso de la carte
 * @param verso face verso de la carte
 * @param check correcte ou incorecte
 */
class Flashcards {
	constructor(recto, verso, check) {
        this.recto = recto;
        this.verso = verso;
        this.check = check;
    }
}

function hit() {
    heal -= 2;
	bdv.style.width = heal + "%";
}

function counter() {

    count++;
	combien.textContent = count;
}

function flip() {
    flashcard.style.transform = "rotateY(180deg)";
    ecaflip = true;
    console.log(ecaflip);
}

function flop() {
    flashcard.style.transform = "rotateY(0deg)";
    ecaflip = false;
    console.log(ecaflip);
}

function echec() {
    if (ecaflip == true) {
        hit();
		counter();
		flop();
    }
}

function succes() {
	if (ecaflip == true) {
		counter();
		flop();
	}
}

function switchi() {
    document.location.pathname = "/Pages/Addcarte.html";
    console.log("switchi");

}





