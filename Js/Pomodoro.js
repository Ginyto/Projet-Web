const deg = 6;
const h = document.querySelector(".h");
const m = document.querySelector(".m");
const s = document.querySelector(".s");

setInterval(() => {
	let jour = new Date();
    let hh = jour.getHours()*30;
	let mm = jour.getMinutes() * deg;
	let ss = jour.getSeconds() * deg;

	//console.log("min"+ minutes);
	//console.log(heures);
	//console.log(secondes);

    
    h.style.transform = `rotateZ(${hh + (mm/12)}deg)`
	m.style.transform = `rotateZ(${mm + ss / 60}deg)`;
	s.style.transform = `rotateZ(${ss}deg)`;
})




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

	if (param == 4) {
		document.location.pathname = "/Pages/Pomodoro.html";
	}

	if (param == 5) {
		document.location.pathname = "/Pages/About.html";
	}
}
