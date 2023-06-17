const {Router} = require('express');
const { getGames } = require ( "../controller/gamesController" );

const router = Router();


router.get('/', getGames);

module.exports = router;