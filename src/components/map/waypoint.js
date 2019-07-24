import React, { useState, useEffect } from 'react';

function Waypoint({ waypoint, block }) {

   // LOCAL STATE
   const [local, set_local] = useState({
      alignment: null,
      background: null,
      position: {},
   })

   // GENERATE APPROPARIATE CONTENT
   useEffect(() => {

      // UPDATE LOCAL STATE
      set_local({
         alignment: (waypoint.align === undefined) ? 'left' : waypoint.align,
         background: require('../../interface/images/numbers/' + (block + 1) + '.png'),
         position: {
            left: waypoint.coords.x + '%',
            top: waypoint.coords.y + '%'
         }
      })

   }, [waypoint, block])

   return (
      <foreignObject width={ '100%' } height={ '100%' }>
         <div className={ 'waypoint' } style={ local.position }>
            <img
               src={ require('../../interface/images/waypoints/space.png') }
               id={ waypoint.type }
               alt={ '' }
            />
            <span id={ local.alignment }>
               <img
                  src={ local.background }
                  alt={ '' }
               />
            </span>
         </div>
      </foreignObject>
   )
}

export default Waypoint;