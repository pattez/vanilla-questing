import React from 'react';
import '../interface/css/menu.scss';

import Main from './menu/main';
import Help from './menu/help';
import Storage from './menu/storage';
import Actions from './menu/actions';
import Profiles from './menu/profiles';
import Create from './menu/create';

function Menu() { return (
   <div id="menu"><div className="inner">
      <div>
         <Main header='Route' link='/' />
         <Main header='Manifesto' link='/manifesto' />
         <Help />
         <Main header='Settings' link='/settings' />
      </div>
      <div>
         <Storage />
         <Actions />
         <Profiles />
         <Create />
      </div>
   </div></div>
)}

export default Menu;
