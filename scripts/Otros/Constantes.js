// Estado de la partida

const LIBRE = 'libre';
const JAQUE = 'jaque';


// Propiedades del tablero

const TABLERO_SIZE = [ '750px', '750px' ];

const WIDTH = 8;
const HEIGHT = 8;

const MARMOL_001 = 'url(./assets/textures/bg.jpg)';


// Propiedades de las celdas

const CELDA_SIZE = ['100px', '100px'];

// PAR  // IMPAR    // HOVER    // SELECT   // PLAYS    // KILL
const BLANCO_NEGRO = ['white', 'rgba(40, 40, 40, .9)', 'yellow', 'rgb(0, 175, 255)', 'rgb(0, 255, 100', 'red'];
const BLANCO_AZUL = ['white', 'rgba(40, 120, 255, .7)'];
const BLANCO_ROJO = ['white', 'rgba(40, 40, 40)'];


// Propiedades de las piezas

const NEGRAS = 'negras';
const BLANCAS = 'blancas';

const TORRE = 'torre';
const CABALLO = 'caballo';
const ALFIL = 'alfil';
const REINA = 'reina';
const REY = 'rey';
const PEON = 'peon';

const PIEZA_SIZE = [ '80%' ];

const TIPOS_PIEZAS = [
    '001', '002', '003', '004'
];


// Movimientos de las piezas

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
const TOP_LEFT = 4;
const TOP_RIGHT = 5;
const BOTTOM_RIGHT = 6;
const BOTTOM_LEFT = 7;
const LEFT_UP = 8;
const LEFT_DOWN = 9;
const PK_TOP_LEFT = 10;
const PK_TOP_RIGHT = 11;
const JUMP_TOP_LEFT = 12;
const JUMP_TOP_RIGHT = 13;
const JUMP_BOTTOM_LEFT = 14;
const JUMP_BOTTOM_RIGHT = 15;
const JUMP_LEFT_UP = 16;
const JUMP_LEFT_DOWN = 17;
const JUMP_RIGHT_UP = 18;
const JUMP_RIGHT_DOWN = 19;