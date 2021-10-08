class Contenedor {
    constructor() {
        this.contenedor = document.getElementById('root');
    }

    addComponent(element) {
        this.contenedor.appendChild(element);
    }
}