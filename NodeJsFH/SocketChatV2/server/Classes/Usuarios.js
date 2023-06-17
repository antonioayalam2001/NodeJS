
class Usuarios {
      constructor() {
            this.people = [];
      }

//      add person  to chat
      addPerson(id,name,room){
            let person = {id,name,room};
            this.people.push(person);
      //      Return all persons in the chat
            return this.people;
      }

      getOnePerson(id){
            let person = this.people.filter(person => person.id === id)[0];
            //if person -> person else -> undefined
            return person;
      }

      get persons(){
            return this.people;
      }
      getPersonsPerRoom (room) {
            let personsInRoom = this.persons.filter(person => person.room ===room)
            return personsInRoom;
      }

      removeDisconnected(id){
            let deletedPerson = this.getOnePerson(id)
            //Getting al the persons who are not the same from the ID
            this.people = this.people.filter(person => person.id != id);
            return deletedPerson;
      }
}

module.exports = {Usuarios}