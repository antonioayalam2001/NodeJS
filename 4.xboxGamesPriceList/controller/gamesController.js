const { request: req, response: res } = require('express');
const listOfGames = require('../helpers/getGames');


const getGames = async (req, res) => {

      const games = await listOfGames('https://www.microsoft.com/es-MX/store/deals/games/xbox');

      res.status(200).json({
            msg: 'Everything is working as it supposed to be',
            games: games
      })
}


module.exports = {
      getGames
}