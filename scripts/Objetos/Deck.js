class Deck {
    constructor(tablero, bando) {
        this.tablero = tablero;
        this.deck = [];
        this.bando = bando;

        this.deck[0] = new Torre(this, bando);
        this.deck[1] = new Caballo(this, bando);
        this.deck[2] = new Alfil(this, bando);
        this.deck[3] = new Rey(this, bando);
        this.deck[4] = new Reina(this, bando);
        this.deck[5] = new Alfil(this, bando);
        this.deck[6] = new Caballo(this, bando);
        this.deck[7] = new Torre(this, bando);
        
        this.deck[8] = new PeonEspecial(this, bando);
        this.deck[9] = new PeonEspecial(this, bando);
        this.deck[10] = new PeonEspecial(this, bando);
        this.deck[11] = new PeonEspecial(this, bando);
        this.deck[12] = new PeonEspecial(this, bando);
        this.deck[13] = new PeonEspecial(this, bando);
        this.deck[14] = new PeonEspecial(this, bando);
        this.deck[15] = new PeonEspecial(this, bando);
    }

    asignarPiezas() {
        const valor = this.bando == BLANCAS ? 7 : 0;    
        const offset = this.bando == BLANCAS ? -1 : 1; 

        for (let i = 0; i < this.deck.length / 2; i++) {
           this.tablero.getCelda(new Point(i, valor)).updatePieza(this.deck[i]); 
           this.tablero.getCelda(new Point(i, valor + offset)).updatePieza(this.deck[this.deck.length / 2 + i]); 
        }
    }

    calcularJugadas() {
        for (let i = 0; i < this.deck.length; i++)
           this.deck[i].getJugadas().generarJugadas(); 
    }

    cambiarPieza(from, to) {
        const point = from.getFather().getPoint();
        var pos = -1;

        for (let i = 0; i < this.deck.length && pos == -1; i++)
            if (this.deck[i].getFather().getPoint().equals(point)) pos = i;

        if (pos != -1) this.deck[pos] = to;
        
        this.tablero.getCelda(point).updatePieza(null);
        this.tablero.getCelda(point).updatePieza(to);
    }

    hasPlays() {
        var b = false;

        for (let i = 0; i < this.deck.length && !b; i++) {
            if (this.deck[i].getJugadas().getMovimientos().length != 0) b = true;
        }

        return b;
    }

    getTablero() { return this.tablero }
    getKingPosition() { return this.deck[3].getFather().getPoint() }
}