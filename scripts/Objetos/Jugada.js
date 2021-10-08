class Jugada {
    constructor(pieza, casillas, direcciones, killFront) {
        this.pieza = pieza;
        this.casillas = casillas;
        this.direcciones = direcciones;
        this.killFront = killFront;

		this.tablero = this.pieza.getDeck().getTablero();
    }

    generarJugadas() {
        this.jugadas = [];
        this.contador = 0;

        for (let i = 0; i < this.direcciones.length; i++) {
            var posicion = this.pieza.getFather().getPoint();
            var jugadas = [ posicion ];

            for (let j = 0; j < this.casillas && posicion != null; j++) {
                posicion = this.comprobarJugada(posicion, this.direcciones[i]);

                if (posicion != null)
                    jugadas[i + 1] = posicion;
            }
        }
    }

    comprobarJugada(posicion, direccion) {
        const value = this.pieza.getObjective() == 0 ? -1 : 1;
        var pos = null;
        var point = null;

        switch (direccion) {
            case UP:
                point = new Point(posicion.getX(), posicion.getY() + 1*value);
                pos = this.tryAddJugada(point, false);
                break;     

            case DOWN:
                point = new Point(posicion.getX(), posicion.getY() - 1*value);
                pos = this.tryAddJugada(point, false);
                break;

            case LEFT:
                point = new Point(posicion.getX() + 1*value, posicion.getY());
                pos = this.tryAddJugada(point, false);
                break;

            case RIGHT:
                point = new Point(posicion.getX() - 1*value, posicion.getY());
                pos = this.tryAddJugada(point, false);
                break;

            case TOP_LEFT:
                point = new Point(posicion.getX() + 1*value, posicion.getY() + 1*value);
                pos = this.tryAddJugada(point, false);
                break;     

            case TOP_RIGHT:
                point = new Point(posicion.getX() - 1*value, posicion.getY() + 1*value);
                pos = this.tryAddJugada(point, false);
                break;     

            case BOTTOM_LEFT:
                point = new Point(posicion.getX() + 1*value, posicion.getY() - 1*value);
                pos = this.tryAddJugada(point, false);
                break;

            case BOTTOM_RIGHT:
                point = new Point(posicion.getX() - 1*value, posicion.getY() - 1*value);
                pos = this.tryAddJugada(point, false);
                break;
            case PK_TOP_LEFT:
                point = new Point(posicion.getX() - 1*value, posicion.getY() + 1*value);
                this.tryAddJugada(point, true);
                break;

            case PK_TOP_RIGHT:
                point = new Point(posicion.getX() + 1*value, posicion.getY() + 1*value);
                this.tryAddJugada(point, true);
                break;

            case JUMP_TOP_LEFT:
                point = new Point(posicion.getX() + 1*value, posicion.getY() + 2*value);
                this.tryAddJugada(point, false);
                break;

            case JUMP_TOP_RIGHT:
                point = new Point(posicion.getX() - 1*value, posicion.getY() + 2*value);
                this.tryAddJugada(point, false);
                break;

            case JUMP_BOTTOM_LEFT:
                point = new Point(posicion.getX() + 1*value, posicion.getY() - 2*value);
                this.tryAddJugada(point, false);
                break;

            case JUMP_BOTTOM_RIGHT:
                point = new Point(posicion.getX() - 1*value, posicion.getY() - 2*value);
                this.tryAddJugada(point, false);
                break;
            case JUMP_LEFT_UP:
                point = new Point(posicion.getX() + 2*value, posicion.getY() + 1*value);
                this.tryAddJugada(point, false);
                break;

            case JUMP_LEFT_DOWN:
                point = new Point(posicion.getX() + 2*value, posicion.getY() - 1*value);
                this.tryAddJugada(point, false);
                break;

            case JUMP_RIGHT_UP:
                point = new Point(posicion.getX() - 2*value, posicion.getY() + 1*value);
                this.tryAddJugada(point, false);
                break;

            case JUMP_RIGHT_DOWN:
                point = new Point(posicion.getX() - 2*value, posicion.getY() - 1*value);
                this.tryAddJugada(point, false);
                break;
        }

        return pos;
    }

    tryAddJugada(point, bEspecial) {
        if (!this.dentroMargenes(point)) return null;

        var posicion = null;

        if (TABLERO.getCelda(point).getPieza() == null) {
            if (!bEspecial) {
                this.jugadas[this.contador] = point;
                this.contador++;
                posicion = point;
            }
        }
        else if ((this.killFront || bEspecial) && this.piezaEnemigaAt(point)) {
            this.jugadas[this.contador] = point;
            this.contador++;
        }

        return posicion;
    }

    piezaEnemigaAt(point) {
        return (TABLERO.getCelda(point).getPieza().getBando() != this.pieza.getBando());
    }

    dentroMargenes(point) {
        return (point.getX() < 8 && point.getX() > -1 && point.getY() < 8 && point.getY() > -1);
    }

    contains(point) {
        var b = false;

        for (let i = 0; i < this.jugadas.length && !b; i++)
           if (this.jugadas[i].equals(point)) b = true;
        
        return b
    }

    getMovimientos() { return this.jugadas; }
}