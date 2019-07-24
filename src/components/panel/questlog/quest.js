import React, { useState, Fragment } from 'react';
import { shorten } from '../../../funcs/misc';
import { fetch_id } from '../../../funcs/quests';

import Single from '../single';
import Split from '../split';

function Quest({ data, quests }) {

   // ROW TYPE
   const [type] = useState(data.status ? 'ends' : 'starts');
   
   // GENERATE ROW
   function row() {
      switch(typeof data.quest) {

         // ARRAYS
         case 'object': { return (
            <Split
               header={ shorten(data.quest[0]) }
               tag={ data.quest[1] }
               to={ 'https://classicdb.ch/?quest=' + fetch_id(data.quest, quests) }
            />
         )}

         // STRINGS
         default: { return (
            <Single
               header={ shorten(data.quest) }
               to={ 'https://classicdb.ch/?quest=' + fetch_id(data.quest, quests) }
            />
         )}
      }
   }

   return (
      <Fragment>
         <span className={ type + '-icon' } />
         <div className={ type + '-row' }>
            { row() }
         </div>
      </Fragment>
   )
}

export default Quest;