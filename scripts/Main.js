// Declaracion e inicializacion de constantes de entorno

const TABLERO_COLOR = BLANCO_NEGRO;
const TABLERO_IMAGE = MARMOL_001;
const TIPO_PIEZA = TIPOS_PIEZAS[0];


// Cojo referencia del contenedor principal

const CONTENEDOR = new Contenedor();


// Genero el tablero

const TABLERO = new Tablero();


// Genero la interfaz

CONTENEDOR.addComponent(TABLERO.getElement());
CONTENEDOR.addComponent(new Regla().getElement());


// Genero y seteo valores por defectos del tablero ( Vacio, sin piezas ni nada )

TABLERO.generarCeldas();


// Empieza la partida ( Se inicializan variables, generan piezas, etc.. )

TABLERO.comenzarPartida();



/**                               #################### NOTAS #################### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

La logica del jaque funcionara en base a un array de jugadas. Este array se calculara automaticamente al comenzar una partida y cada vez que se mueva una ficha.

La idea es que cada pieza tenga un array con todas las jugadas posibles que se puedan hacer ( array de points )

Existen dos tipos de jugadas: Jugadas libres y jugadas contra jaque.

Las jugadas libres son las que no importa el movimiento que hagas, tu rey seguira a salvo ( Tendra que comprobarse si al hacer esa jugada el rey sigue sin estar en jaque )

Las jugadas anti jaque son las que requieren un movimiento para evitar el jaque al rey ( Tendra que comprobarse si con esa jugada el rey deja de estar amenazado )

Por lo tando, las jugadas almacenadas en el array dependeran del estado de la partida: LIBRE O JAQUE. Si se esta en jaque, se tendra que calcular las jugadas que puedan evitarlo. En caso contrario, se calcularan las jugadas que no cambien el estado de la partida a jaque.

Sin importar el tipo de jugada, la derrota se la llevara el bando que sume un total de 0 jugadas posibles entre todas sus piezas. Es decir, if ( jugadasTotales == 0 ) finPartida(bando)

CUIDADO: Este sistema puede traer problemas debido al estado de la partida. Ya que una jugada de un bando puede causar jaque al enemigo. Como detecto si el jaque es hacia el enemigo con una variable de estado?

SOLUCION: El cambio de estado se hara al cambiar el turno.

*/
