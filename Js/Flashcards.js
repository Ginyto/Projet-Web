/**
 * Classe Flashcards qui a pour paramètre recto et verso
 * @param recto face verso de la carte
 * @param verso face verso de la carte
 */
class Flashcards {
	constructor(recto, verso, lvl, ) {
		this.recto = recto;
		this.verso = verso;
		this.lvl = lvl;
    }
    
    getLvl() {
        return this.niveaux;
    }

    setLvl(lvl) {
        this.lvl = lvl;
    }

	getRecto() {
		return this.recto;
	}

	getVerso() {
		return this.verso;
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
	}

	flipverso() {
		this.verso.hidden = true;
		this.recto.hidden = false;
	}
}

