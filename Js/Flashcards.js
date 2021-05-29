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
var maindeck = document.querySelector(".maindeck");
var deckzone = document.getElementById("deckzone");
var world = -1;
var bzone = document.getElementById("bzone");

duel = 666;
selected = false;



//localStorage.clear();



/////////////////////////Cartes///////////////////
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
    heal -= 10;
	bdv.style.width = heal + "%";
}

function counter() {

    count++;
	combien.textContent = count;
}

function flip() {
    if (selected) {
        flashcard.style = "transition: all 1s ease;";
        flashcard.style.transform = "rotateY(180deg)";
	    ecaflip = true;
        console.log(ecaflip);
    }
}

function flop() {
    flashcard.style.transform = "rotateY(0deg)";
    flashcard.style = "transition: all 0.05s ease;";
    ecaflip = false;
    console.log(ecaflip);
}

function echec() {
    if (ecaflip == true) {
        hit();
		counter();
        flop();
        memdeck[duel][yo].check = false;
    }
}

function succes() {
	if (ecaflip == true) {
		counter();
        suivant();
        memdeck[duel][yo].check = true;

        //console.log(memdeck[duel][yo]);

        if (resultat == 3) {
            alert("Game Over");
        }
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

/**
 * Ajout de carte de maniere dynamique
 */
function addcard() {
    var maindeck = document.getElementById(memdeck.length);
    console.log(maindeck);
    var carte = new Flash(terme.value, def.value, false, deckname.value);

    deckname.style = "border: #282A36";
    maindeck.children.item(1).textContent = carte.deck;
    terme.value = "";
    def.value = "";
    num.textContent = "No." + (deck.length+ 2);
    maindeck.children.item(2).textContent = deck.length + 1;
    console.log("world : "+world)
    localStorage.setItem(world, (carte.deck+'/'+carte.recto+'/'+carte.verso+'/'+carte.check));
    deck.push(carte);
    world++;
}

/**
 * Création de deck dynamiquement
 */
function creadeck() {
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
    creadeck(1);
}

/**
 * Rafraichissement des données
 * @param {Permet d'afficher un deck vierge ou non} x 
 */
function download(x) {
    //console.log("init... taille storage : " + localStorage.length);

    var superdeck = [];

    for (let i = 1; i <= localStorage.length; i++) {
		
		var carte = new Flash(
		localStorage.getItem(i).split("/")[1],
		localStorage.getItem(i).split("/")[2],
		localStorage.getItem(i).split("/")[3],
		localStorage.getItem(i).split("/")[0]
	    );
        //console.log(carte);
        superdeck.push(carte);
	}
	
    
    memdeck = [];//on nettoie la memoire interne pour la remplacer par la memoire cloud(localstorage)

    for (let i = 0; i < superdeck.length; i++) {
        var nom_mem = superdeck[i].deck;
        deck = [];
        //console.log("deck :");

        for (let j = 0; j < superdeck.length; j++) {
            var nom = superdeck[j].deck;

            if (nom_mem == nom) {
                //console.log("add");
                deck.push(superdeck[j])
            }
        }

        //console.log(deck);
        var onoff = true;

        for (let i = 0; i < memdeck.length; i++) {
            if (memdeck[i][0].deck == deck[0].deck){
                //console.log("oui");
                onoff = false;
            }
        }

        if (onoff) {
            memdeck.push(deck);
        }

        //console.log(memdeck);

    }

    //console.log(memdeck.length)
    for (let i = 0; i < memdeck.length; i++) {
        //console.log(memdeck[i]);
        //console.log("you")
		loadingdeck(i, memdeck[i][0].deck, memdeck[i].length);
	}

    if (x == true) {
		loadingdeck(memdeck.length, "Nom du deck", "Nombre de cartes");
		world = memdeck.length + 1;
		deck = [];
	}
}

function loadingdeck(x, nom, nbr) {

    if (x == 0) {
        document.getElementById("0").remove();
    }

    var newdeck = document.createElement("div");
    //console.log(memdeck.length);
    nuevo(newdeck, "maindeck", x);
    nuevoclick(newdeck, "modescreen(" + x +")");
    deckzone.appendChild(newdeck);

    var no = document.createElement("div");
    var nomdeck = document.createElement("div");
    var countdeck = document.createElement("div");

    nuevo(no, "infodeck", "no");
    nuevo(nomdeck, "infodeck", "nom");
    nuevo(countdeck, "infodeck", "nbr");

    nuevotext(no, "No." + (x+1));
    nuevotext(nomdeck, nom);
    nuevotext(countdeck, nbr);

    newdeck.appendChild(no);
    newdeck.appendChild(nomdeck);
    newdeck.appendChild(countdeck);
}


function modescreen(params) {
    yugi = params;
    yo = 0;
    duel = params;
    selected = true;

    //console.log(memdeck[params]);

    affichage(params, yo);
    
}

function affichage(x, y) {
    rface.textContent = memdeck[x][y].recto;
    vface.textContent = memdeck[x][y].verso;
}

function suivant() {
    flop();
    if (yo < memdeck[yugi].length - 1) {
        yo++;
    }

    //console.log("yugi = " + yugi + " yo = " + yo);
    affichage(yugi, yo);
    //console.log(yo);
}

function precedent() {
    flop();
    if (yo > 0) {
        yo--;
    }
    //affichage(yugi, yo);
    console.log(yo);
}

function pathfinder(param) {
    if (param == 0) {
        document.location.pathname = "/Pages/Index.html";
    }

    if (param == 1) {
        document.location.pathname = "/Pages/Flashcards.html";
    }

    if (param == 2) {
			document.location.pathname = "/Pages/Addcarte.html";
    }
    
    if (param == 3) {
			document.location.pathname = "/Pages/Gestionnaire.html";
    }
}

function play() {
    resultat = 0;
    


    if (fanny) {
        flop();
    }

    selected = true;

    if (duel != 666) {
        bzone.style.display = "flex";
        document.getElementById("start").style.display = "none";
        deckzone.style.display = "none";
        score = 0;
    }

}

function antiplay(params) {
    bzone.style.display = "none";
	document.getElementById("start").style.display = "";
    deckzone.style.display = "flex";
    count = 0;
    combien.textContent = 0;

}
