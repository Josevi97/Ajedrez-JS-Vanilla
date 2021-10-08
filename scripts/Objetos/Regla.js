class Regla {
    constructor() {
        this.regla = document.createElement('table');
        this.regla.style.position = 'absolute';
        this.regla.style.width = TABLERO_SIZE[0];
        this.regla.style.height = TABLERO_SIZE[1];
        this.regla.style.borderCollapse = 'collapse';
        this.regla.style.top = '0';
        this.regla.style.left = '0';
        this.regla.style.userSelect = 'none';
        this.regla.style.pointerEvents = 'none';

        var abc = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];

        for (let i = 0; i < HEIGHT; i++) {
            var tr = document.createElement('tr');
            tr.style.position = 'relative';

            for (let j = 0; j < WIDTH; j++) {
                var td = document.createElement('td'); 
                td.style.position = 'relative';
                td.style.width = CELDA_SIZE[0];
                td.style.height = CELDA_SIZE[1];

                if (j == 0) td.appendChild(this.generarParrafo(8 - i, new Point(j, i), true));
                if (i == 7) td.appendChild(this.generarParrafo(abc[j], new Point(j, i), false));
                
                tr.appendChild(td);
            }

            this.regla.appendChild(tr);
        }
    }

    generarParrafo(texto, point, offset) {
        var div = document.createElement('div');

        div.style.position = 'absolute';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.top = '0';

        var b = document.createElement('b');
        b.appendChild(document.createTextNode(texto));

        b.style.position = 'absolute';
        b.style.display = 'block';
        b.style.color = this.calcularColor(point);
        b.style.fontFamily = 'Calibri';
        b.style.fontSize = '.9em';

        if (offset) {
            b.style.top = '0';
            b.style.left = '0';
            b.style.padding = '5px';
        }
        else {
            b.style.bottom = '0';
            b.style.right = '0';
            b.style.padding = '3px 8px';
        }

        div.appendChild(b);

        return div;
    }

    calcularColor(point) {
        var b = point.getX() % 2 == 0 && point.getY() % 2 != 0 || point.getX() % 2 != 0 && point.getY() % 2 == 0;
        return !b ? TABLERO_COLOR[1] : TABLERO_COLOR[0];
    }

    getElement() { return this.regla; }
}