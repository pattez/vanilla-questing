import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Context } from "../../context";

import { autocenter, update_position } from "../../funcs/map";

import Line from './line';
import Waypoint from './waypoint';

function Container({ resolution }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATES
   const [background, set_background] = useState({})
   const [markers, set_markers] = useState([])
   const [position, set_position] = useState({})
   const [movement, set_movement] = useState({
      last_position: {},
      last_event: {},
      enabled: false
   })

   // CHANGE LINE COLOR FOR THE FOLLOWING ZONES
   const whitelist = new Set([
      'barrens',
      'stonetalon',
      'orgrimmar',
      'azshara',
      'badlands',
      'blasted',
      'darnassus',
      'durotar',
      'ironforge',
      'needles',
      'redridge',
      'stormwind',
      'tanaris',
      'westfall',
      'thunderbluff'
   ])

   // UPDATE BACKGROUND
   useEffect(() => {

      // UPDATE STATE
      set_background({
         background: 'url(' + require('../../interface/images/maps/' + state.data.route[state.current].zone + '.jpg') + ')'
      })

   }, [state.data.route[state.current].zone])

   // UPDATE MARKERS
   useEffect(() => {

      // FETCH WAYPOINTS & CHECK IF LINE NEEDS TO BE OFFCOLOUR
      const waypoints = state.data.route[state.current].waypoints;
      const offcolor = whitelist.has(state.data.route[state.current].zone);

      // UPDATE STATE
      set_markers(waypoints.map((waypoint, index) =>
         <Fragment key={ index }>
            <Line
               current={ waypoint }
               next={ waypoints[index + 1] }
               offcolor={ offcolor }
            />
            <Waypoint
               waypoint={ waypoint }
               block={ index } 
            />
         </Fragment>
      ))

   }, [state.data.route[state.current].waypoints])

   // UPDATE POSITION
   useEffect(() => {
      if (resolution !== null) {
         
         // FIND CENTER COORDINATES
         const position = autocenter({
            waypoints: state.data.route[state.current].waypoints,
            resolution: resolution
         })

         // UPDATE POSITION STATE
         set_position({
            left: position.x + 'px',
            top: position.y + 'px',
         })

         // UPDATE MOVEMENT STATE
         set_movement({
            ...movement,
            last_position: position
         })

      }
   }, [resolution, state.data.route[state.current].waypoints])

   // ENABLE MOVEMENT
   function enable(event) {
      event.target.parentElement.style.transition = "none";
   
      // UPDATE MOVEMENT STATE
      set_movement({
         ...movement,
         enabled: true,
         last_event: event
      })
   }

   // DISABLE MOVEMENT
   function disable(event) {
      event.target.parentElement.style.transition = "0.2s";
      
      // UPDATE MOVEMENT STATE
      set_movement({
         ...movement,
         enabled: false,
      })
   }

   // MOVE MAP POSITION
   function move(event) {
      event.persist();

      if (movement.enabled) {

         // FIND NEW POSITION
         const position = update_position({
            event: event,
            last_event: movement.last_event,
            last_position: movement.last_position,
            resolution: resolution
         })

         // UPDATE POSITION STATE
         set_position({
            left: position.x + 'px',
            top: position.y + 'px',
         })

         // UPDATE MOVEMENT STATE
         set_movement({
            ...movement,
            last_event: event,
            last_position: position
         })
      }
   }

   return (
      <svg
         id={ 'map' }
         style={{ ...background, ...position }}
         onMouseDown={ enable }
         onMouseUp={ disable }
         onMouseLeave={ disable }
         onMouseMove={ move }
      >{ markers }</svg>
   )
}

export default Container;