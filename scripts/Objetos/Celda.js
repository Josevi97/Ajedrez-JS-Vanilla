class Celda {
	constructor(point) {
		this.point = point;
		this.pieza = null;

		this.celda = document.createElement('td');
		this.celda.style.width = CELDA_SIZE[0];
		this.celda.style.height = CELDA_SIZE[1];
		this.celda.style.backgroundColor = this.calcularColor(point);
		this.celda.style.position = 'relative';
		this.celda.style.border = '1px solid black';

		this.celda.addEventListener('mouseenter', () => onMouseEnter(point));
		this.celda.addEventListener('mouseleave', () => onMouseLeave(point));
		this.celda.addEventListener('click', () => onClick(point));
		this.celda.addEventListener('contextmenu', event => onRightClick());
	}

	tryHover(b) {
		this.celda.style.backgroundColor = b ? TABLERO_COLOR[2] : this.calcularColor();
	}

	trySelect(b) {
		this.celda.style.backgroundColor = b ? TABLERO_COLOR[3] : this.calcularColor();
	}

	suggest(b) {
		this.celda.style.backgroundColor = b ? 
			this.pieza == null ? 
				TABLERO_COLOR[4] : 
				TABLERO_COLOR[5] : 
			this.calcularColor();
	} 

	updatePieza(pieza) {
		if (pieza != null) {
			pieza.setFather(this);
			this.celda.appendChild(pieza.getElement());
		}
		else if (this.pieza != null) this.celda.removeChild(this.pieza.getElement());

		this.pieza = pieza;
	}

	calcularColor() {
		var b = this.point.getX() % 2 == 0 && this.point.getY() % 2 != 0 || this.point.getX() % 2 != 0 && this.point.getY() % 2 == 0;
		return !b ? TABLERO_COLOR[0] : TABLERO_COLOR[1];
	}

	getPoint() { return this.point; }
	getPieza() { return this.pieza; }
	getElement() { return this.celda; }
}
