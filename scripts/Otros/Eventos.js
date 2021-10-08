function onMouseEnter(point) {
    const pieza = TABLERO.getCelda(point).getPieza();

    if (TABLERO.isAlly(pieza)) {
        if (TABLERO.getCurrentPieza() == null && pieza.isMovable()) {
            TABLERO.getCelda(point).tryHover(true);
            mostrarJugadas(true, point);
        }
    }
    else if (TABLERO.getCurrentPieza() != null && TABLERO.getCurrentPieza().getJugadas().contains(point)) {
        TABLERO.getCelda(point).tryHover(true);
    }
    
    // La condicion deberia ser comprobada en la clase Tablero
}

function onMouseLeave(point) {
    const pieza = TABLERO.getCelda(point).getPieza();
        
    if (TABLERO.getCurrentPieza() == null && TABLERO.isAlly(pieza)) {
        TABLERO.getCelda(point).tryHover(false);
        mostrarJugadas(false, point);
    }
    else if (TABLERO.getCurrentPieza() != null && TABLERO.getCurrentPieza().getJugadas().contains(point)) {
        TABLERO.getCelda(point).suggest(true);
    }

    // La condicion deberia ser comprobada en la clase Tablero
}

function onRightClick() {
    event.preventDefault();

    TABLERO.getCelda(TABLERO.getCurrentPieza().getFather().getPoint()).trySelect(false);
    cancelarSeleccion();
}

function onClick(point) {
    const pieza = TABLERO.getCelda(point).getPieza();

    if (TABLERO.getCurrentPieza() == null) {
        if (TABLERO.isAlly(pieza) && pieza.isMovable()) {
            TABLERO.setCurrentPieza(pieza);
            TABLERO.getCelda(point).trySelect(true);
        }
    }
    else if (TABLERO.getCurrentPieza().canMove(point)) {
        if (pieza != null) TABLERO.comerPieza(point);

        TABLERO.move(point);

        cancelarSeleccion();

        TABLERO.cambiarTurno();
    }

    // La condicion deberia ser comprobada en la clase Tablero
}

function cancelarSeleccion() {
    if (TABLERO.getCurrentPieza() == null) return;

    var jugadas = TABLERO.getCurrentPieza().getJugadas().getMovimientos();

    for (let i = 0; i < jugadas.length; i++)
        TABLERO.getCelda(jugadas[i]).suggest(false);

    TABLERO.setCurrentPieza(null);
}

function mostrarJugadas(b, point) {
    if (TABLERO.getCelda(point).getPieza() != null) {
        var jugadas = TABLERO.getCelda(point).getPieza().getJugadas().getMovimientos();

        for (let i = 0; i < jugadas.length; i++)
            TABLERO.getCelda(jugadas[i]).suggest(b);
    }
}