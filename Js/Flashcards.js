/**
 * Classe Flashcards qui a pour paramètre recto et verso
 * @param recto face verso de la carte
 * @param verso face verso de la carte
 */
class Flashcards {
	constructor(recto, verso, lvl, correct) {
		this.recto = recto;
		this.verso = verso;
        this.lvl = lvl;
        this.correct = correct
    }

    setCorrect(correct) {
        this.correct = correct
    }
    
    setLvl(lvl) {
        this.lvl = lvl;
    }

	setRecto(recto) {
		this.recto = recto;
	}

	setVerso(verso) {
		this.recto = verso;
	}

	fliprecto() {
		this.recto.hidden = true;
        this.verso.hidden = false;
        console.log("coucou");
	}

	flipverso() {
		this.verso.hidden = true;
		this.recto.hidden = false;
    }
}
var utilitab = document.getElementById("recto");
