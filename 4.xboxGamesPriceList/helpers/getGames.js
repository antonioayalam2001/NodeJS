const puppeteer = require ( "puppeteer" );

async function listOfGames ( url ) {
      console.log ( "Fetching items, this may take a bit..." );
      const gamesArray = [];
      const browser = await puppeteer.launch ();
      const page = await browser.newPage ();
      await page.goto ( url );

      const nameArray = await page.evaluate (
          () =>
              [ ...document.querySelectorAll ( "h3.c-subheading-6" ) ].map (
                  ( partner ) => partner.innerText
              ) //Gets list of all items for sale (currently only supports up to 90 per page)
      );

      const priceArray = await page.evaluate (
          () =>
              [ ...document.querySelectorAll ( "div div span.x-screen-reader" ) ].map (
                  ( partner ) => partner.innerText
              )
      );


      const imgArray = await page.evaluate (
          () =>
              [ ...document.querySelectorAll ( "div.c-channel-placement-image picture img" ) ].map (
                  ( img ) => img.getAttribute ( 'data-src' )
              )
      );


      let price = priceArray;
      price = priceArray.filter ( ( e ) => e !== "Game Pass" ); // Filters out unwanted items

      let filterout = price;
      filterout = price.filter ( ( e ) => e !== "filtered by" ); // Filters out "filtered by"

      let filteroutGold = filterout;
      filteroutGold = filterout.filter ( ( e ) => e !== "Gold" ); // Filters out "Games with Gold Price"

      console.log ( "+++++++++++++++++++++++++++++++++++++++++++++++++++" );

      // Put price information into a multidimensional array (Full and Now Price)
      function TwoDimensional ( arr , size ) {
            var res = [];
            for ( var i = 0 ; i < arr.length ; i = i + size ) {
                  // console.log ( arr.slice ( i , i + size ) )
                  res.push ( arr.slice ( i , i + size ) );

            }
            return res
      }

      let multidimensionalPriceArray = TwoDimensional ( filteroutGold , 2 );

      for ( let i = 0 ; i < multidimensionalPriceArray.length ; i++ ) {
            const key =
                [
                      "name" ,
                      "formerPrice" ,
                      "salePrice" ,
                      "img"
                ]

            let value =
                [
                      nameArray[ i ] , multidimensionalPriceArray[ i ][ 0 ] , multidimensionalPriceArray[ i ][ 1 ] ,imgArray[i]
                ]

            let object = ( first , second ) => {
                  return first.reduce ( ( game , val , ind ) => {
                        //Return an object { }
                        /* +++++++++++++++++++++++++++++++++++
                        game : starts as { }
                        first = keys []
                        second = values []
                        ind : index
                        val :name                  ind = 0      values [0]   =   nameArray[ i ]
                        val : formerprice       ind = 1      values [1]   =   multidimensionalPriceArray[ i ][0]
                        val : salePrice           ind = 2      values [2]   =   multidimensionalPriceArray[ i ][1]
                        val : img                  ind = 3     values [3]   =   imgArray[i]
                        ++++++++++++++++++++++++++++++++++++*/
                        game[ val ] = second[ ind ];
                        return game;
                  } , {} );
            };

            gamesArray.push(object(key,value));
            // console.log ( object ( key , value ) )
      }
      // console.log (gamesArray)
      return gamesArray;

      browser.close ();
}

// scrapeAPI (  `https://www.microsoft.com/es-MX/store/deals/games/xbox?s=store&skipitems=${process.argv[2]}` );
// scrapeAPI (  `https://www.microsoft.com/es-MX/store/deals/games/xbox` );

module.exports = listOfGames;