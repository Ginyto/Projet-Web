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
var terme = document.getElementById("terme");
var def = document.getElementById("def");
var deck = [];
var memdeck = [];
var num = document.getElementById("num");
var deckname = document.getElementById("decknom");
var maindeck = document.getElementById("maindeck");
var deckzone = document.getElementById("deckzone");


/**
 * Classe Flashcards qui a pour paramètre recto et verso
 * @param recto face verso de la carte
 * @param verso face verso de la carte
 * @param check correcte ou incorecte
 * @param deck
 */
class Flash {
	constructor(recto, verso, check, deck) {
        this.recto = recto;
        this.verso = verso;
        this.check = check;
        this.deck = deck;
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

function nuevo(param, classref, idref) {
    param.className = classref;
    param.id = idref;
}

function nuevotext(param, text) {
    param.textContent = text;
}

function nuevoclick(param,path) {
    param.setAttribute("onclick",path);
}


function addcard() {
    var taille = memdeck.length;
    console.log(taille)
    var maindeck = document.getElementById(taille);
    var carte = new Flash(terme.value, def.value, false, deckname.value);

    deckname.style = "border: #282A36";
    maindeck.children.item(1).textContent = carte.deck;
    terme.value = "";
    def.value = "";
    num.textContent = "No." + (deck.length+ 2);
    maindeck.children.item(2).textContent = deck.length + 1;
    deck.push(carte);
}

function creadeack() {
    memdeck.push(deck);
    cloudeck();
    deck = [];

    var newdeck = document.createElement("div");
    console.log(memdeck.length);
    nuevo(newdeck, "maindeck", memdeck.length);
    nuevoclick(newdeck,"document.location.pathname = '/Pages/Gestionnaire.html'");
    deckzone.appendChild(newdeck);

    var no = document.createElement("div");
    var nomdeck = document.createElement("div");
    var countdeck = document.createElement("div");

    nuevo(no, "infodeck", "no");
    nuevo(nomdeck, "infodeck", "nom");
    nuevo(countdeck, "infodeck", "nbr");

    nuevotext(no, "No." + (memdeck.length + 1));
    nuevotext(nomdeck, "Nom du deck");
    nuevotext(countdeck, "Nombres de cartes")

    newdeck.appendChild(no);
    newdeck.appendChild(nomdeck);
    newdeck.appendChild(countdeck);

    console.log(deck);
    console.log(memdeck);
    console.log(memdeck[0].length)

}

function resetcreadeck() {
    deckname.style = "border-bottom: coral solid 1px;";
    deckname.value = "";
    terme.value = "";
    def.value = "";
    num.textContent = "No.1";
    num = 0;
    creadeack(1);
}

function cloudeck() {
    sessionStorage.setItem(memdeck.length, deck.carte);

}

function test() {
    console.log(memdeck);
}






