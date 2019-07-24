// PARSE QUESTLOG
function filter({ current, data }) {

   // QUEST CONTAINER
   const container = new Map();

   // LOOP THROUGH DATA TO CURRENT BLOCK
   for (let x = 0; x < current; x++) {

      // SHORTHAND
      const waypoints = data.route[x].waypoints;

      // LOOP THROUGH EACH WAYPOINT
      waypoints.forEach(waypoint => {

         // LOOP THROUGH ENDS
         if (waypoint.ends !== undefined) {
            waypoint.ends.forEach(quest => {
      
               // QUEST NAME
               const name = quest_name(quest);

               // REMOVE IT
               container.delete(name);
            });
         }

         // LOOP THROUGH STARTS
         if (waypoint.starts !== undefined) {
            waypoint.starts.forEach(quest => {
      
               // QUEST NAME
               const name = quest_name(quest);

               // ADD IT
               container.set(name, {
                  quest: quest,
                  status: false
               });
            });
         }

         // LOOP THROUGH OBJECTIVES
         if (waypoint.objectives !== undefined) {
            waypoint.objectives.forEach(quest => {

               // QUEST NAME
               const name = quest_name(quest);

               // IF THE QUEST HAS BEEN PICKED UP
               if (container.has(name)) {

                  // CHANGE STATUS
                  container.set(name, {
                     quest: quest,
                     status: true
                  });
               }
            });
         }
      });
   }

   // CONVERT TO ARRAY & RETURN
   return Array.from(container.values());
}

// FIND QUEST NAME
function quest_name(quest) {
   switch (quest instanceof Array) {
      case true: {
         return quest[0]
      }
      default: {
         return quest;
      }
   }
}

// FETCH QUEST ID FOR SIDEPANEL LINKS
function fetch_id(quest, quests) {
   switch(typeof quest) {

      // STRING
      case 'string': {
         return quests[quest.toString().toLowerCase()];
      }

      // ARRAYS
      default: {
         switch(quest[1][0].toLowerCase()) {

            // CHAIN QUEST
            case 'p': {
               const id = parseInt(quest[1].split('-')[0].replace(/\D/g, '')) - 1;
               return quests[quest[0].toString().toLowerCase()][id];
            }

            // SOMETHING ELSE
            default: {
               return quests[quest[0].toString().toLowerCase()];
            }
         }
      }
   }
}

export {
   filter,
   fetch_id
}