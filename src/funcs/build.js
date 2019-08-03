// ALLIANCE
import human from '../routes/alliance/human.json';
import gnorf from '../routes/alliance/gnorf.json';
import nelf from '../routes/alliance/nelf.json';
import alliance_shared from '../routes/alliance/shared.json';
import alliance_quests from '../routes/alliance/quests.json';
import Darkshore from '../routes/alliance/Darkshore_16-17.json';
import Gilnash1 from '../routes/alliance/Gilnash1-12Jud_Edition_-_Warrior.json';
import Gilnash2 from '../routes/alliance/Gilnash12-23Jud_Edition_-_All_Classes.json';

// HORDE
import trorc from '../routes/horde/trorc.json';
import tauren from '../routes/horde/tauren.json';
import undead from '../routes/horde/undead.json';
import horde_shared from '../routes/horde/shared.json';
import horde_quests from '../routes/horde/quests.json';

// DEVELOPMENT
import dev_route from '../routes/dev/route.json';
import dev_quests from '../routes/dev/quests.json';

// RACE SPECIFIC STARTERS
const races = {
   alliance: new Map([
      ['human', human],
      ['dwarf', gnorf],
      ['gnome', gnorf],
      ['nelf', nelf],
      ['darkshore', Darkshore],
      ['gilnash1', Gilnash1],
      ['gilnash2', Gilnash2],
   ]),
   horde: new Map([
      ['orc', trorc],
      ['troll', trorc],
      ['tauren', tauren],
      ['undead', undead],
   ])
}

// CONSTRUCT REQUESTED ROUTE
function route(race) {

   // PLACEHOLDER
   let content = {};

   // GENERATE ALLIANCE BUILD
   if (races.alliance.has(race)) {
      content = {
         quests: alliance_quests,
         route: [
            ...races.alliance.get(race).path,
            // ...alliance_shared.path
         ]
      }

   // GENERATE HORDE BUILD
   } else if (races.horde.has(race)) {
      content = {
         quests: horde_quests,
         route: [
            ...races.horde.get(race).path,
            ...horde_shared.path
         ]
      }
   }

   // CONSTRUCT & RETURN DATA OBJECT
   return {
      quests: content.quests,
      route: content.route,
      hearthstones: hearthstones(content.route),
      race: race
   }
}

// RANDOM ROUTE
function random() {

   // PICK A RACE RANDOMLY
   const all = [ ...races.alliance.keys(), ...races.horde.keys() ];
   const race = Math.floor((Math.random() * all.length) + 0);

   // CONSTRUCT BUILD
   const build = route(all[race]);

   // RETURN FINALIZED BUILD
   return {
      data: build,
      current: Math.floor((Math.random() * build.route.length - 1) + 1)
   }
}

// SPECIFIC ROUTE
function specific({ race, block }) {

   // DEFAULT TO RANDOM ROUTE
   let response = random();

   // MAKE SURE THE RACE EXISTS
   if (exists(race)) {

      // FETCH BUILD
      const build = route(race);

      // IF THE REQUESTED BLOCK IS WITHIN LIMITS
      if (block <= build.route.length) {

         // UPDATE RESPONSE WITH REQUESTED ROUTE
         response = {
            data: build,
            current: parseInt(block)
         }
      }
   }

   // FINALLY RETURN
   return response;
}

// IMPORTED DATASET
function custom({ build, faction }) {
   return {
      data: {
         quests: faction === 'alliance' ? alliance_quests : horde_quests,
         route: build.path,
         hearthstones: hearthstones(build.path)
      },
      current: 0
   }
}

// DEVELOPMENT DATASET
function dev() {
   return {
      data: {
         quests: dev_quests,
         route: dev_route.path,
         hearthstones: hearthstones(dev_route.path)
      },
      current: 0
   }
}

// FIND HEARTHSTONE BLOCK INDEXES
function hearthstones(route) {
   const container = [];

   // ASSEMBLE LIST OF EACH 'SET HS' OCCURRENCE
   route.forEach((block, index) => {
      block.waypoints.forEach(waypoint => {
         if (waypoint.special !== undefined) {
            waypoint.special.forEach(message => {
               if (typeof message === 'string' && message.toLowerCase() === 'set hearthstone') {
                  container.push({
                     block: index,
                     zone: block.zone
                  });
               }
            });
         }
      });
   });

   return container;
}

// CHECK IF RACE EXISTS --- FORCE LOWERCASE
function exists(race) {

   // MAKE UNITED MAP
   const keys = new Map([
      ...races.alliance,
      ...races.horde
   ]);

   // PERFORM & RETURN CHECK
   return keys.has(race.toLowerCase())
}

export {
   random,
   specific,
   custom,
   dev,
   exists
}
