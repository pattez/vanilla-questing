import React from 'react';
import { shorten } from '../../../funcs/misc';
import { fetch_id } from '../../../funcs/quests';

function Objective({ index, quests, waypoint }) {

   // GENERATE CONTENT
   function content() {
      const types = ['ends', 'completed', 'starts', 'objectives', 'special'];
      let content = [];

      // PROCESS EACH TYPE & RECALIBRATE STATE
      types.forEach(type => {
         if (waypoint[type] !== undefined) {
            content.push(process({
               data: waypoint[type],
               type: type,
            }))
         }
      });

      return content;
   }

   // PROCESS CONTENT
   function process({ data, type }) {
      return data.map((header, index) =>
         <div key={ index } className={ type }>
            { row(header, type) }
         </div>
      );
   }

   // GENERATE APPROPRIATE ROW
   const row = (header, type) => {

      // SPECIALS
      if (type === 'special') {
         if (header instanceof Array) {
            return <div><a href={ header[1] } target="_blank" rel="noopener noreferrer">{ header[0] }</a></div>
         } else {
            return <div>{ header }</div>
         }

      // ARRAYS
      } else if (header instanceof Array) {
         return <Multi
            header={ header[0] }
            tag={ header[1] }
            quests={ quests }
         />

      // DEFAULTS
      } else {
         return <Single
            header={ header }
            quests={ quests }
         />
      }
   }

   return (
      <div className="section">
         <div className="title">
            <div>{ index + 1 }. { waypoint.header }</div>
            <div class="waypoint">{ waypoint.coords.x + '.' + waypoint.coords.y }</div>
         </div>
         { content() }
      </div>
   )
}

// DEFAULT BLOCK
function Single(props) { return (
   <div>
      <a href={ 'https://classicdb.ch/?quest=' + fetch_id(props) } target='_blank' rel='noopener noreferrer'>{ shorten(props.header) }</a>
   </div>
)}

// MULTI HEADER BLOCK
function Multi(props) { return (
   <div className="split">
      <div><a href={ 'https://classicdb.ch/?quest=' + fetch_id(props) } target='_blank' rel='noopener noreferrer'>{ shorten(props.header) }</a></div>
      <div>{ props.tag }</div>
   </div>
)}

export default Objective;
