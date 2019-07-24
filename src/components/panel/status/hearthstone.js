import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../context";

function Hearthstone() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCATION STATE
   const [location, set_location] = useState(null)

   // FIND LATEST HEARTHSTONE LOCATION
   useEffect(() => {

      // FILTER OUT RELEVANT HEARTHSTONE LOCATIONS
      const filtered = state.data.hearthstones.filter(id => id.block < state.current);
      let value = 'none';

      // IF THERES LOCATIONS FOUND, FETCH THE MOST RECENT ONE
      if (filtered.length !== 0) {
         value = filtered[filtered.length - 1].zone;
      }

      // UPDATE LOCATION STATE
      set_location(value)

   }, [state.current, state.data])

   return (
      <div id="hearthstone" className="split">
         <div>Hearthstone</div>
         <div>{ location }</div>
      </div>
   )
}

export default Hearthstone;