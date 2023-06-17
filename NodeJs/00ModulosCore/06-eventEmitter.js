'use strict'

const { removeAllListeners } = require('process');

// Funciona medinate el patrón OBSERVADOR UNO A MUCHOS
// UN CAMBIO -> NOTIFICA A TODOS
var EventEmitter = require('events').EventEmitter;
// Variables que requiere de la libreria EventEmitter
// Variable que va a publicar

var publish = new EventEmitter();

// Agregando evento, y una funcion a ser ejecutada
publish.on('myEvent', (message) => {
    console.log(message);
})
// Solo se emite una sola vez
publish.once('myEvent', (message) => {
    console.log("Se emite la primera vez");
});

publish.emit('myEvent', 'Soy un emisor de evento');

// Ya no se ejecuta el de publish once
publish.emit('myEvent', 'Segunda llamada');

removeAllListeners('myEvent');


