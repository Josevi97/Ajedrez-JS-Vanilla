class Tablero {
	constructor() {
		this.tabla = document.createElement('table');
		this.tabla.style.backgroundImage = TABLERO_IMAGE;
		this.tabla.style.width = TABLERO_SIZE[0];
		this.tabla.style.height = TABLERO_SIZE[1];
		this.tabla.style.borderCollapse = 'collapse';

		this.tablero = [];
		this.estado = LIBRE;

		this.width = 8;
		this.height = 8;

		for (let index = 0; index < HEIGHT; index++)
			this.tablero[index] = new Array(WIDTH);
	}


	generarCeldas() {
		for (let i = 0; i < this.height; i++) {
			this.tabla.appendChild(document.createElement('tr'));
	
			for (let j = 0; j < this.width; j++) {
				this.tablero[j][i] = new Celda(new Point(j, i));
				this.tabla.appendChild(this.tablero[j][i].getElement());
			}
		}
	}

	comenzarPartida() {
		this.inicializarVariablesEstado();
		this.generarPiezas();
		this.cambiarTurno();
	}

	inicializarVariablesEstado() {
		this.turno = NEGRAS;
		this.current_pieza = null;
		this.deckBlancas = new Deck(this, BLANCAS);
		this.deckNegras = new Deck(this, NEGRAS);
	}

	generarPiezas() {
		this.deckBlancas.asignarPiezas();
		this.deckNegras.asignarPiezas();
	}

	generarJugadas() {
		const deck = this.turno == BLANCAS ?
			this.deckBlancas :
			this.deckNegras;

		deck.calcularJugadas();
	}

	rotar(b) {
		var rotacion = b ? 'rotate(+180deg)' : 'rotate(-360deg)';
		this.tabla.style.transform = rotacion;

		for (let i = 0; i < HEIGHT; i++)
			for (let j = 0; j < WIDTH; j++) 
				this.getCelda(new Point(j, i)).getElement().style.transform = rotacion;
	}

	move(point) {
		this.getCelda(this.current_pieza.getFather().getPoint()).trySelect(false);

		this.getCelda(this.current_pieza.getFather().getPoint()).updatePieza(null);
		this.getCelda(point).updatePieza(null);
		this.getCelda(point).updatePieza(this.current_pieza);

		this.current_pieza.onmove();
	}


	cambiarTurno() {
		this.generarJugadas();		// Genero jugadas del deck actual

		this.turno = this.turno == BLANCAS ? NEGRAS : BLANCAS;
		this.rotar(this.turno != BLANCAS);

		this.generarJugadas();		// Genero jugadas del deck siguiente (turno cambiado)
	}

	resetPartida(nombre) {
		alert('Las ' + nombre + ' ganan!!');
		
		this.limpiarTablero();
		this.comenzarPartida();
	}

	limpiarTablero() {
		for (let j = 0; j < this.height; j++)
			for (let i = 0; i < this.width; i++)
				this.getCelda(new Point(j, i)).updatePieza(null);

		this.deckBlancas = null;
		this.deckNegras = null;
	}

	cambiarEstado() {
		this.estado = this.estado == LIBRE ? JAQUE : LIBRE;

		console.log('Estado cambiado');
	}

	isAlly(pieza) {
		return pieza != null && pieza.getBando() == this.turno;
	}

	isJaque(bando, point) {
		if (!point.isValid()) return;

		const deck = bando == BLANCAS ? this.deckNegras : this.deckBlancas;

		return deck.getKingPosition().equals(point);
	}

	comerPieza(point) {}

	// SETTERS

	setCurrentPieza(pieza) { this.current_pieza = pieza; }


	// GETTERS

	getCelda(point) { return this.tablero[point.getX()][point.getY()] }
	getElement() { return this.tabla; }
	getTurno() { return this.turno; }
	getCurrentPieza() { return this.current_pieza; }
	getPiezasBlancas() { return this.piezas_blancas; }
	getPiezasNegras() { return this.piezas_negras; }
	getEstado() { return this.estado; }
	getCurrentDeck() { return this.turno == BLANCAS ? this.deckBlancas : this.deckNegras }
	getEnemyDeck() { return this.turno == BLANCAS ? this.deckNegras : this.deckBlancas; }
}