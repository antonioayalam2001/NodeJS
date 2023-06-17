const {leerInput, inquirerMenu, pause, listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas.js");


const main = async () => {
      console.clear();
      const busquedas = new Busquedas()
      let opt;
      do{
            opt = await inquirerMenu();
            switch (opt){
                  case 1:
                        //Show message
                      const place = await leerInput('City');
                      const places = await busquedas.ciudad(place);
                      const id = await listarLugares(places)
                      if (id===0) continue;
                            //Finding which one is the id from the place that was selected by the user
                            const selectedPlace = places.find(place=>place.id === id);

                            //Save on DB
                      busquedas.agregarHistorial(selectedPlace.place_name)

                            //Getting lon and lat
                            const {lat , lng }  = selectedPlace;
                            //Getting the clima
                            const clima = await busquedas.weatherByPlace(lat,lng);
                            console.log(`\nInformacion de la ciudad   \n`.green);
                            console.log(`Ciudad ${selectedPlace.place_name}`);
                            console.log(`Latitude ${lat.toFixed(2)}`);
                            console.log(`Longitude: ${lng.toFixed(2)}`);
                            console.log(`Como esta el clima`.underline.bold);
                            console.log(`Temperature : ${clima.temp}`.bold);
                            console.log(`Max_Temperature : ${clima.temp_max}`);
                            console.log(`Min_Temperature ${clima.temp_min}`);
                            console.log(`Description: ${clima.description}`.underline.bold);

                        break
                  case 2:

                        busquedas.historyUpperCase.forEach((place,index)=>{
                              const idx = `${index+1}`.green;
                              console.log(`${idx} ${place}`);
                        })
                        break;
            }
            if (opt !==0) await pause();
      }while(opt!==0 )

}

main()