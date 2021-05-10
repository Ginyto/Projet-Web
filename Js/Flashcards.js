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

    setCorrect(correct) {
        this.correct = correct
    }
    
    setLvl(lvl) {
        this.lvl = lvl;
    }

	setRecto(recto) {
		this.crecto = recto;
	}

	setVerso(verso) {
		this.crecto = verso;
	}

	fliprecto() {
		this.recto.hidden = true;
        this.verso.hidden = false;
	}

	flipverso() {
		this.verso.hidden = true;
		this.recto.hidden = false;
    }
}

var carte = new Flashcards("rectocontenue", "versocontenue", 0, true);

carte.setRecto("heho");

if (carte.crecto != "") {
    console.log(carte.crecto);
}


//carte.fliprecto();
//carte.flipverso();




