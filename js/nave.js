//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
//al cargar por completo la página...
window.onload = function () {
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function (ekeyCode) {
		if (ekeyCode == 32) {
			motorOn();
		} else {
			motorOff();
		}
	}
	document.onclick = function () {
		if (a == g) {
			motorOn();
		} else {
			motorOff();
		}
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	//Empezar a mover la nave justo después de cargar la página
	start();
	//Definición de funciones
	function start() {
		//cada intervalo de tiempo mueve la nave
		timer = setInterval(function () {
			moverNave();
		}, dt * 1000);
	}

	function stop() {
		clearInterval(timer);
	}

	function moverNave() {
		//cambiar velocidad y posicion
		v += a * dt;
		y += v * dt;
		//actualizar marcadores
		velocidad.innerHTML = v.toFixed(2);
		altura.innerHTML = y.toFixed(2);
		//mover hasta que top sea un 70% de la pantalla
		if (y < 60) {
			document.getElementById("nave").style.top = y + "%";
		} else {
			fuel = 0;
			stop();
			if (v > 5 || y <= 0) {
				document.getElementById("bnave").src = "img/Fuego.png";
				setTimeout(alert("GAME OVER"), 1000);
				//window.location.href='nave.html';
			} else {
				document.getElementById("bnave").src = "img/ok.png";
				alert("YOU WIN THIS TIME!").src = "img/Fuego.png";
				window.location.href = 'nave.html';
			}
		}
	}

	function motorOn() {
		//el motor da aceleración a la nave
		a = -g;
		//mientras el motor esté activado gasta combustible
		if (timerFuel == null) timerFuel = setInterval(function () {
			actualizarFuel();
		}, 10);
		document.getElementById("bnave").src = "img/Navefuego.png"
	}

	function motorOff() {
		a = g;
		clearInterval(timerFuel);
		timerFuel = null;
		document.getElementById("bnave").src = "img/Nave.png"
	}

	function actualizarFuel() {
		//Restamos combustible hasta que se agota
		c -= 0.1;
		if (c < 0) c = 0;
		combustible.innerHTML = c.toFixed(2);
	}
	/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
	document.getElementById("bmenu").onclick = function () {
		document.getElementById("myDropdown").style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("bseguir").onclick = function () {
		document.getElementById("myDropdown").style.display = "none";
		start();
	}
	// Close the dropdown if the user clicks outside of it
	window.onclick = function (event) {
		if (!event.target.matches('.dropbtn')) {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				}
			}
		}
	}
}