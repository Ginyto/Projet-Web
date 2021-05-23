const flashcard = document.querySelector(".flashcard");
var rface = document.getElementById("recto");
var vface = document.getElementById("verso");
var count = 0;
var combien = document.getElementById("compteur");
var bdv = document.getElementById("ko");
var heal = 100;


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

function flip() {
    flashcard.style.transform = "rotateY(180deg)";
    console.log("Flip");
    heal -= 2;
    bdv.style.width = heal + "%";
    console.log(heal);
    
}

function flop() {
	flashcard.style.transform = "rotateY(0deg)";
    console.log("Flop");
    count++;
    console.log(combien.textContent);
    combien.textContent = count;
}




