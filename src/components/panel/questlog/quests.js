import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../context";
import { filter } from "../../../funcs/quests";

import Quest from './quest';

function Quests({ visible }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL CONTENT STATE
   const [content, set_content] = useState([]);

   // LOCAL VISIBILITY STATE
   const [visibility, set_visibility] = useState({
      display: 'none'
   });

   // TOGGLE VISIBILITY
   useEffect(() => {
      set_visibility({
         display: visible ? 'block' : 'none'
      })
   }, [visible])

   // RENDER QUESTLOG CONTENT
   useEffect(() => {

      // PARSE QUESTS
      const quests = filter(state).map((data, index) => 
         <Quest
            key={ index }
            data={ data }
            quests={ state.data.quests }
         />
      );

      // UPDATE CONTENT STATE
      set_content(quests);

   }, [state.current, state.data.route])

   return (
      <div id="quests" style={ visibility }>
         <div className="section">
            <div className="title">
               <div>Current Quests</div>
               <div>{ content.length } / 20</div>
            </div>
            { content }
         </div>
      </div>
   )
}

export default Quests;