"use strict";

var eventEmitter = require("events").EventEmitter;
class Clock extends eventEmitter {
  constructor() {
    super();
    setInterval(() => {
      this.emit("tick");
    }, 1000);
  }
    
    addZero(num) {
        (num < 10) ? num = "0" + num : num;
        return num;
    }
  theTime() {
    var date = new Date();
    var hrs = this.addZero(date.getHours());
    var min = this.addZero(date.getMinutes());
    var seconds = this.addZero(date.getSeconds());
    console.log(hrs + ":" + min + ":" + seconds);
  }
}

Clock.prototype.agregaFunction = function () { 
    console.log("Agregando funcion"); 
}

var a = 10;

module.exports = {Clock,a};