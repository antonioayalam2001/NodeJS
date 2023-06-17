'use strict'
var Clock = require('./clock').Clock;
var a = require('./clock').a;


var clock1 = new Clock();
clock1.on('tick', function () {
   clock1.theTime(); 
});

clock1.agregaFunction();