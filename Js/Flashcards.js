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




