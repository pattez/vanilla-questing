import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../context";
import { jump } from "../../../funcs/browsing";

function Progress() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL PROGRESS STATE
   const [local, set_local] = useState({
      progress: null,
      width: {}
   })

   // RECALIBRATE PROGRESS
   useEffect(() => {

      // FIND PERCENTAGE
      const current = ((state.current / (state.data.route.length - 1)) * 100).toFixed(2) + '%';

      // UPDATE LOCAL STATE
      set_local({
         progress: current,
         width: {
            width: current
         }
      })

   }, [state.current, state.data])

   return (
      <div id="progress" onClick={(event) => { jump(event, state, dispatch) }}>
         <div className="split">
            <div>Progress</div>
            <div>{ local.progress }</div>
            <div id="bar" style={ local.width } />
         </div>
      </div>
   )
}

export default Progress;