/* +++++++++++++++++++++++++++++++++++
REST API :
      Verbos de HTTP que se utilizan para poder realizar la distribución
      de información mediante POST DELETE UPDATE GET
      de tal forma que se nos permite realizar una obtención
      o alteración de información
++++++++++++++++++++++++++++++++++++*/

const API_URL = 'https://swapi.dev/api/'

//Funcion experimental de fetch, la cual se encuentra en l
const data = await fetch ( `${ API_URL }` );
const json = await data.json ();
const { name , gender } = json;

// console.log ( name , gender );

/* +++++++++++++++++++++++++++++++++++
window -> Referencia al objeto window del navegador
globalThis -> Referencia al objeto window del navegador
++++++++++++++++++++++++++++++++++++*/

/* +++++++++++++++++++++++++++++++++++
Proxy :
      Realizar la intercepción de propiedades con respecto
      al objeto pasado (a la llamada que se le hace)
++++++++++++++++++++++++++++++++++++*/
const createApi = url => {
      //Depende de lo que intente hacer en el primer objeto, primero pasara por el get
      return new Proxy ( {} , {
            get : ( target , prop ) => {
                  //      Debemos retornar una funcion, dado que el metodo get es el que se ejecuta
                  // console.log ( 'target' , target );
                  return async ( id ) => {
                        const res = await fetch ( `${ url }/${ prop }/${ id }` );
                        if ( res.ok ) return res.json ();
                        return Promise.reject ( { error : 'Something went wronk' } )
                  }
            } ,
            post : ( target , prop ) => {
                  return () => {
                        console.log ( 'Hola' , prop )
                  }
            }

      } )
};

const api = createApi ( API_URL );
const first = await api.people(1);
console.log (first)


/* +++++++++++++++++++++++++++++++++++
Patrón de diseño Proxy
Intermediario que nos permite acceder a un objeto
++++++++++++++++++++++++++++++++++++*/


/* +++++++++++++++++++++++++++++++++++
const target = [ 'Tony' , 'Ramon' , 'Lupita' ];

const proxy = new Proxy ( target , {
      get ( target , property , receiver ) {
            console.log ( 'Hello someone has invoice me ' );
            console.log ( target , property , receiver )
      }
} )

target = Objeto al que queremos acceder
property = Propiedad a la que buscamos acceder
receiver = Objeto que recibimos

console.log ( proxy[ 0 ] )
      Hello someone has invoice me
      undefined

target =  [ 'Tony' , 'Ramon' , 'Lupita' ]
[0] = propiedad

Por defecto se ejecuta el metodo de GET de nuestro
Proxy

Retorna undefined, cuando no especificamos un valor de
retorno


++++++++++++++++++++++++++++++++++++*/

const target = [ 'Tony' , 'Ramon' , 'Lupita' ];

const proxy = new Proxy ( target , {
      get ( target , property , receiver ) {
            if ( property === 'length' ) return target.length;
            //Debemos especificar el retorno
            return target[property];
      },
      set ( target , property , value ) {
            if ( (typeof (value)!=="number")){
                  return target[property] = value
            }
            return console.log ('Sorry you put some value bad ')
      }
} )


// ['Tony','Ramon','Lupita'];
proxy[3] = 'Hello';

for ( let i = 0 ; i < proxy.length ; i++ ) {
      console.log (proxy[i]);
}













