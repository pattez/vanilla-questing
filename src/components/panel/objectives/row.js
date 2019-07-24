import React, { useContext, Fragment } from 'react';
import { Context } from "../../../context";

import { shorten } from '../../../funcs/misc';
import { fetch_id } from '../../../funcs/quests';

import Single from '../single';
import Split from '../split';

function Row({ data, type }) {
   return data.map((quest, index) =>
      <Fragment key={ index }>
         <span className={ type + '-icon' } />
         <div className={ type + '-row' }>
            <Name
               data={ quest }
               type={ type }
            />
         </div>
      </Fragment>
   )
}

// QUEST NAME SELECTOR
function Name({ data, type }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // NON SPECIALS
   if (type !== 'special') {
      switch(typeof data) {

         // ARRAY
         case 'object': { return (
            <Split
               header={ shorten(data[0]) }
               tag={ data[1] }
               to={ 'https://classicdb.ch/?quest=' + fetch_id(data, state.data.quests) }
            />
         )}
   
         // STRING
         default: { return (
            <Single
               header={ shorten(data) }
               to={ 'https://classicdb.ch/?quest=' + fetch_id(data, state.data.quests) }
            />
         )}
      }

   // SPECIALS
   } else {
      switch(typeof data) {

         // ARRAY
         case 'object': {
            return <Single header={ data[0] } to={ data[1] }  />
         }

         // STRING
         default: {
            return <div>{ data }</div>
         }
      }
   }
}

export default Row;