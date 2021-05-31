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
var bzone = document.getElementById("bzone");
var startzone = document.getElementById("mario");
var set = document.getElementById("set");

duel = 666;
selected = false;
battle = 1;




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
    heal -= 20;
	bdv.style.width = heal + "%";
}

function counter() {

    count++;
	combien.textContent = count;
}

function flip() {
    if (selected && battle!= 666) {
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

        if (heal == 0) {
            alert("Game Over tu dois encore réviser");
            antiplay();
        }
    }
}

function succes() {
	if (ecaflip == true) {
		counter();
        suivant();
        memdeck[duel][yo].check = true;
        resultat++;

        //console.log(memdeck[duel][yo]);

        if (resultat >= memdeck[yugi].length) {
            antiplay();
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

function upload(params) {
    localStorage.clear();
    var id = 0;
    for (let i = 0; i < memdeck.length; i++) {
        for (let j = 0; j < memdeck[i].length; j++) {
            const element = memdeck[i][j];
            localStorage.setItem(id, (element.deck + '/' + element.recto + '/' + element.verso + '/' + element.check));
            //console.log(id, (element.deck+'/'+element.recto+'/'+element.verso+'/'+element.check));
            //console.log(element+id);
            id++;
        }
    }
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
    upload();
    deck.push(carte);
}

function delatecard(params) {
    console.log(memdeck[yugi][yo]);

    var del = memdeck[yugi][yo].recto;

    console.log(del);

    if (window.confirm("Voulez vous vraiment supprimer la carte ?")) {
        for (let index = 0; index < localStorage.length; index++) {
            const element = localStorage.getItem(index);
			if (del == element.split("/")[1]) {
                console.log("je supprime cette carte du cloud : " + element.split("/")[1] + " id : " + index);
                localStorage.removeItem(index);
            }
		}
    
        //console.log("Yes");
        document.getElementById(yugi).children.item(2).textContent = memdeck[yugi].length - 1;
        memdeck[yugi].splice(yo,1);
        console.log(memdeck[yugi]);

        upload();
    }

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

    

    for (let i = 0; i <= localStorage.length-1; i++) {
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
    console.log(yugi);
    console.log(screen);

    if (!screen) {
        flop();
        affichage(yugi, yo);
    }
    if (screen) {
        splash();
    }
}

function splash(params) {
    set.children.item(0).textContent = "Gianlucca";
    console.log(set.children.item(0));
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
        document.location.pathname = "/Pages/Landing.html";
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

    if (param == 4) {
			document.location.pathname = "/Pages/Pomodoro.html";
    }

    if (param == 5) {
			document.location.pathname = "/Pages/About.html";
		}

}

function play() {
    resultat = 0;
    bdv.style.width = "100%";
    battle = 1;
    


    if (fanny) {
        flop();
    }

    selected = true;

    if (duel != 666) {
        bzone.style.display = "flex";
        document.getElementById("start").style.display = "none";
        document.getElementById("shuffle").style.display = "none";
        deckzone.style.display = "none";
        startzone.style.display = "none";
        score = 0;
    }

}

function shuffle(params) {
    battle = 1;
    resultat = 0;
	bdv.style.width = "100%";

	if (fanny) {
		flop();
	}

	selected = true;

	
	bzone.style.display = "flex";
    document.getElementById("shuffle").style.display = "none";
    document.getElementById("start").style.display = "none";
	deckzone.style.display = "none";
    score = 0;
    startzone.style.display = "none";
    
    var sdeck = [];

    for (let index = 0; index < memdeck.length; index++) {
        for (let i = 0; i < memdeck[index].length; i++) {
            sdeck.push(memdeck[index][i]);
            
        }
    }

    memdeck[0] = sdeck;

    console.log(sdeck);
    console.log(memdeck[0]);

    modescreen(0);
}



function antiplay(params) {
    bdv.style.width = "100%";
    flop();
    bzone.style.display = "none";
    document.getElementById("start").style.display = "";
    document.getElementById("shuffle").style.display = "";
    deckzone.style.display = "flex";
    startzone.style.display = "flex";
    count = 0;
    combien.textContent = 0;

}

//////////////////pomodoro////////////////
/*const deg = 6;
const h = document.querySelector(".h");
const m = document.querySelector(".m");
const s = document.querySelector(".s");

setInterval(() => {
	let jour = new Date();
	let hh = jour.getHours() * 30;
	let mm = jour.getMinutes() * deg;
	let ss = jour.getSeconds() * deg;

	//console.log("min"+ minutes);
	//console.log(heures);
	//console.log(secondes);

	h.style.transform = `rotateZ(${hh + mm / 12}deg)`;
	m.style.transform = `rotateZ(${mm + ss / 60}deg)`;
	s.style.transform = `rotateZ(${ss}deg)`;
});*/


