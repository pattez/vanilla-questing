import React, { useState, cloneElement, Children } from 'react';
import { Link } from 'react-router-dom';

function Main({ children, header, link }) {

   // STYLE STATE
   const [style, set_style] = useState({
      display: 'none',
      top: 0,
      left: 0
   });

   // SHOW SUBMENU
   const showSubmenu = (event) => {

      // DEFAULT TO LEFT ALIGNING
      let position = event.target.offsetLeft;

      // IF THERE ISNT ENOUGH SPACE, RIGHT ALIGN
      if ((event.target.offsetLeft + 220) > window.innerWidth) {
         position = window.innerWidth - 220;
      }

      // CHANGE STYLE
      set_style({
         display: 'block',
         left: position,
         top: event.target.offsetHeight
      })
   }

   // HIDE SUBMENU
   const hideSubmenu = () => {
      set_style({
         display: 'none',
         top: 0,
         left: 0
      })
   }

   if (children === undefined) {
      return <Single
         link={ link }
         header={ header }
      />

   // WITH SUBMENU
   } else {
      return <Multi
         showSubmenu={ showSubmenu }
         hideSubmenu={ hideSubmenu }
         header={ header }
         style={ style }
         children={ children }
      />
   }
}

// STANDALONE LINK
function Single({ link, header }) { return (
   <Link to={ link }>
      <li>{ header }</li>
   </Link>
)}

// LINK WITH SUBMENU
function Multi({ showSubmenu, hideSubmenu, header, style, children }) { return (
   <li className='more' onMouseEnter={ showSubmenu } onMouseLeave={ hideSubmenu }>
      { header }
      <div id="submenu" style={ style }>
         { Children.map(children, child =>
            cloneElement(child, { hide: hideSubmenu })
         )}
      </div>
   </li>
)}

export default Main;