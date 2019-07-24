import React, { useState, useEffect } from 'react';

function PrevNext({ visibility, type, func }) {

   // OPACITY STATE
   const [opacity, set_opacity] = useState({
      opacity: 0
   })

   // TOGGLE OPACITY
   useEffect(() => {
      set_opacity({
         opacity: visibility ? 1 : 0
      })
   }, [visibility])

   return (
      <div
         id={ type }
         style={ opacity }
         onClick={ func }
      />
   )
}

export default PrevNext;