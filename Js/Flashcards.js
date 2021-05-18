/**
 * Classe Flashcards qui a pour paramètre recto et verso
 * @param recto face verso de la carte
 * @param verso face verso de la carte
 */
class Flashcards {
	constructor(recto, verso, lvl, correct) {
		this.recto = document.getElementById(recto);
        this.verso = document.getElementById(verso);

        this.crecto = recto.innerText;
        this.cverso = verso.innerText;
        
        this.lvl = lvl;
        this.correct = correct
    }
}

function test() {
    console.log("test");
}

function affichage() {
    const carte = document.querySelector('.flashcard');
    carte.style.display = 'block';
    console.log("show");
}

function flip() {
    const flashcard = document.querySelector('.flashcard');
    var flop = 0;

    if (flop == 0) {
        flashcard.style.transform = "rotateY(180deg)";
        flop = 1;
        console.log(flop);
    }
    if (flop == 1) {
		flashcard.style.transform = "rotateY(-180deg)";
        flop = 0;
        console.log(flop);
		}

    console.log("Flip");
}




