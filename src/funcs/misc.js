import axios from 'axios';

// SHORTHAND FOR LOGGING
function log(stuff) {
   console.log(stuff);
}

// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

// SHORTEN STRING
function shorten(string) {

   // MAX CHARACTER LIMIT
   const max_length = 100;

   // CHECK IF THE STRING IS LONGER THAN 22 CHARACTERS
   if (string.length > max_length) {

      // ALLOW THE FIRST 20 CHARACTERS AND TAG ON THE TRIPLEDOT
      string = string.substring(0, (max_length - 3));
      string += '...';
   }

   return string;
}

// PRELOAD BACKGROUNDS
function preload_bgs(dispatch) {
   console.log('Started Preload!');

   // SHOW PROMPT
   dispatch({
      type: 'show-prompt',
      payload: 'loading'
   })

   // ALL THE ZONES
   const zones = [
      'alterac',
      'arathi',
      'ashenvale',
      'azshara',
      'badlands',
      'barrens',
      'blasted',
      'darkshore',
      'darnassus',
      'deadwind',
      'desolace',
      'durotar',
      'duskwood',
      'dustwallow',
      'elwynn',
      'epl',
      'felwood',
      'feralas',
      'hillsbrad',
      'hinterlands',
      'ironforge',
      'loch',
      'moonglade',
      'morogh',
      'mulgore',
      'needles',
      'orgrimmar',
      'redridge',
      'searing',
      'silverpine',
      'steppes',
      'stonetalon',
      'stormwind',
      'stv',
      'swamp',
      'tanaris',
      'teldrassil',
      'thunderbluff',
      'tirisfal',
      'undercity',
      'ungoro',
      'westfall',
      'wetlands',
      'winterspring',
      'wpl'
   ];

   // PROMISE CONTAINER
   let promises = [];

   // GENERATE & PUSH A PROMISE FOR EACH ZONE
   zones.forEach(zone => {

      // GENERATE A PROMISE
      var p = new Promise((resolve, reject) => {
         axios.get(
            require('../interface/images/maps/' + zone + '.jpg')
         ).then(() => { resolve(); });
      });

      // PUSH IT TO THE CONTAINER
      promises.push(p);
   });

   // WAIT FOR EVERYTHING TO RESOLVE
   Promise.all(promises).then(() => {

      // LOG SUCCESS & HIDE PROMPT
      console.log('Preload Complete!');
      dispatch({ type: 'hide-prompt' })

      dispatch({
         type: 'show-message',
         payload: {
            type: 'good',
            value: 'backgrounds preloaded'
         }
      })
   });
}

export {
   log,
   sleep,
   shorten,
   preload_bgs
}
