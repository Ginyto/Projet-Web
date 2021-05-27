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
var world = 0;
var pages_gestio = document.getElementById("gestio");

//localStorage.clear();


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
    localStorage.setItem(world, (carte.deck+'/'+carte.recto+'/'+carte.verso+'/'+carte.check));
    deck.push(carte);
    world++;
}

function creadeack() {
    memdeck.push(deck);
    deck = [];

    var newdeck = document.createElement("div");
    console.log(memdeck.length);
    nuevo(newdeck, "maindeck", memdeck.length);
    nuevoclick(newdeck,"selecdeck("+memdeck.length+")");
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

function download() {
    console.log("init... world: " + localStorage.length);

    var superdeck = [];

    for (let x = 0; x < localStorage.length; x++) {
			
		var carte = new Flash(
		localStorage.getItem(x).split("/")[1],
		localStorage.getItem(x).split("/")[2],
		localStorage.getItem(x).split("/")[3],
		localStorage.getItem(x).split("/")[0]
	    );
        console.log(carte);
        superdeck.push(carte);
	}
	
    
    memdeck = [];//on nettoie la memoire interne pour la remplacer par la memoire cloud(localstorage)

    for (let i = 0; i < superdeck.length; i++) {
        var nom_mem = superdeck[i].deck;
        deck = [];
        console.log("deck :");

        for (let j = 0; j < superdeck.length; j++) {
            var nom = superdeck[j].deck;

            if (nom_mem == nom) {
                console.log("add");
                deck.push(superdeck[j])
            }
        }

        console.log(deck);
        var onoff = true;

        for (let i = 0; i < memdeck.length; i++) {
            if (memdeck[i][0].deck == deck[0].deck){
                console.log("oui");
                onoff = false;
            }
        }

        if (onoff) {
            memdeck.push(deck);
        }

        console.log(memdeck);
    }


}

function selecdeck(x) {
    var maindeck = document.getElementById(x);
    sessionStorage.setItem("nom", maindeck.children.item(1).textContent);
    document.location.pathname = "/Pages/Gestionnaire.html";
}

function splashscreen(x) {
    var secondeck = document.getElementById(x);
	secondeck.children.item(0).textContent = sessionStorage.getItem("nom");
	console.log(secondeck);
}

pages_gestio.onload = splashscreen(0);







