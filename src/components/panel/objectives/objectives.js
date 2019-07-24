import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../../context";
import Rows from './rows';

function Objectives({ visible }) {

   // GLOBAL STATE
   const { state } = useContext(Context);
   
   // LOCAL VISIBILITY STATE
   const [visibility, set_visibility] = useState({
      display: 'block'
   });

   // TOGGLE VISIBILITY
   useEffect(() => {
      set_visibility({
         display: visible ? 'block' : 'none'
      })
   }, [visible])

   return (
      <div id="objectives" style={ visibility }>
         { state.data.route[state.current].waypoints.map((data, index) =>
            <div className="section" key={ index }>
               <div className="title">
                  <div>{ index + 1 }. { data.header }</div>
                  <div>{ data.coords.x + '.' + data.coords.y }</div>
               </div>
               <Rows data={ data } />
            </div>
         )}
      </div>
   )
}

export default Objectives;