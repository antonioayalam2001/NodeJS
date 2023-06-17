const path = require("path");
const fs = require('fs');
class Ticket {
      constructor(number,desktop) {
            this.number = number;
            this.desktop = desktop;
      }
}

class TicketControl {
      constructor() {
            this.ultimo = 0;
            this.today = new Date().getDate();
            this.tickets = [];
            this.lastFour = [];

            this.init();
      }
      get toJSON () {
            return {
                  ultimo : this.ultimo,
                  today : this.today,
                  tickets : this.tickets,
                  lastFour : this.lastFour,
            }
      }

      init(){
            const {ultimo,today,tickets,lastFour} = require("../db/data.json");
            if (today === this.today){
                  this.ultimo = ultimo;
                  this.tickets = tickets;
                  this.lastFour = lastFour;
            }else{
                  //Another Day we must reset the Database
                  this.saveDB();
            }

      }

      saveDB(){
            const dbPath = path.join(__dirname,"../db/data.json");
            fs.writeFileSync(dbPath, JSON.stringify(this.toJSON))
      }

      next(){
            this.ultimo += 1;
            const ticket = new Ticket(this.ultimo , null);
            this.tickets.push(ticket);
            this.saveDB();
            return `Ticket ${ticket.number}`
      }

      attendTicket (desktop) {
            //Not having any tickets
            if (this.tickets.length === 0){
                  return null;
            }
            //shift return the element that was removed
            const ticket = this.tickets.shift();
            ticket.desktop = `Desktop number : ${desktop}`;
            this.lastFour.unshift(ticket);
            if (this.lastFour.length > 4){
            //      Delete  one
                  this.lastFour.splice(-1,1);
            }
            this.saveDB();
            return ticket;
      }



}

module.exports = TicketControl;