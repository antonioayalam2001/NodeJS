"use strict";
let stdin, stdout, person;

stdin = process.stdin;
stdout = process.stdout;
person = {
  name: null,
  edad: 0,
};

const saveAge = (age) => {
  person.edad = age;
  console.log(person.edad);
  if (person.edad >= 18) {
    stdout.write("\n¡Felicidades, eres mayor de edad!\n");
  } else {
    stdout.write("\n¡Lo siento, eres menor de edad!\n");
  }
    process.exit()
};


const saveName = (name) => {
  person.name = name;
    let question = `Hola cual es tu edad amigo ${person.name}?`;
    quiz(question, saveAge);
  
};

const quiz = (question, funSaveName) => { 
    stdin.resume();
    stdout.write(`${question}\n`);
    stdin.once('data', (res) => {
        funSaveName(res.toString().trim());
    })
}

// Todo lo que entre a la terminal de comandos se codifica de esa forma
stdin.setEncoding('utf8');
quiz('¿Cual es tu nombre?', saveName);