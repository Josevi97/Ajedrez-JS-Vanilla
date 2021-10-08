// Posicion

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(x) { this.x = x; }
    setY(y) { this.y = y; }
    setPoint(x, y) {
        this.setX(x);
        this.setY(y);
    }

    equals(point) {
        return point.getX() == this.getX() && point.getY() == this.getY() ? true : false;
    }

    isValid() {
        return this.getX() != undefined && this.getY != undefined;
    }

    getX() { return this.x; }
    getY() { return this.y; }
}