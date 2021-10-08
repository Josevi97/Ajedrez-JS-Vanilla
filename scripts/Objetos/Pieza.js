class Pieza {
    constructor(deck, nombre, bando) {
        this.deck = deck;
        this.nombre = nombre;
        this.bando = bando;

        this.pieza = document.createElement('div');
        this.pieza.style.width = PIEZA_SIZE[0];
        this.pieza.style.height = PIEZA_SIZE[0];
        this.pieza.style.backgroundImage = 'url(assets/piezas/' + TIPO_PIEZA + '/' + bando + '/' + nombre + '.png)';
        this.pieza.style.backgroundRepeat = 'no-repeat';
        this.pieza.style.backgroundPosition = 'center';
        this.pieza.style.backgroundSize = 'cover';
        this.pieza.style.position = 'absolute';
        this.pieza.style.top = '50%';
        this.pieza.style.left = '50%';
        this.pieza.style.transform = 'translate(-50%, -50%)';
        this.pieza.style.zIndex = '1';

        this.father = null;
        this.objective = bando == BLANCAS ? 0 : 7;
    }

    canMove(point) {
        const jugadas = this.jugadas.getMovimientos();
        var b = false;

        for (let i = 0; i < jugadas.length && !b; i++)
            if (jugadas[i].equals(point)) b = true;

        return b;
    }

    isMovable() {
        return this.getJugadas().getMovimientos().length > 0;
    }

    onmove() {}

    setFather(father) { this.father = father; }

    getNombre() { return this.nombre; }
    getBando() { return this.bando; }
    getFather() { return this.father; }
    getElement() { return this.pieza; }
    getObjective() { return this.objective; }
    getJugadas() { return this.jugadas; }
	getDeck() { return this.deck }
}

class Rey extends Pieza {
    constructor(deck, bando) {
        super(deck, REY, bando);

        this.jugadas = new Jugada(this, 1, [ UP, DOWN, LEFT, RIGHT, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT ], true);
    }
}

class Reina extends Pieza {
    constructor(deck, bando) {
        super(deck, REINA, bando);

        this.jugadas = new Jugada(this, 7, [ UP, DOWN, LEFT, RIGHT, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT ], true);
    }
}

class Alfil extends Pieza {
    constructor(deck, bando) {
        super(deck, ALFIL, bando);

        this.jugadas = new Jugada(this, 7, [ TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT ], true);
    }
}

class Caballo extends Pieza {
    constructor(deck, bando) {
        super(deck, CABALLO, bando);
        this.jugadas = new Jugada(this, 1, [ JUMP_TOP_LEFT, JUMP_TOP_RIGHT, JUMP_BOTTOM_LEFT, JUMP_BOTTOM_RIGHT, JUMP_LEFT_UP, JUMP_LEFT_DOWN, JUMP_RIGHT_UP, JUMP_RIGHT_DOWN ], true);
    }
}

class Torre extends Pieza {
    constructor(deck, bando) {
        super(deck, TORRE, bando);
        this.jugadas = new Jugada(this, 7, [ UP, DOWN, LEFT, RIGHT ], true);
    }
}

class Peon extends Pieza {
    constructor(deck, bando) {
        super(deck, PEON, bando);

        this.jugadas = new Jugada(this, 1, [ UP, PK_TOP_LEFT, PK_TOP_RIGHT ], false);
    }

    onmove() {
        if (this.objective == this.getFather().getPoint().getY()) this.ascender();
    }

    ascender() {
        this.deck.cambiarPieza(this, new Reina(this.deck, this.bando));
    }
}

class PeonEspecial extends Pieza {
    constructor(deck, bando) {
        super(deck, PEON, bando);

        this.jugadas = new Jugada(this, 2, [ UP, PK_TOP_LEFT, PK_TOP_RIGHT ], false);
    }

    onmove() {
        this.deck.cambiarPieza(this, new Peon(this.deck, this.bando));
    }
}