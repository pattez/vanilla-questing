import React, { useState } from 'react';
import '../interface/css/panel.scss';

import Level from './panel/status/level';
import Progress from './panel/status/progress';
import Hearthstone from './panel/status/hearthstone';
import Tab from './panel/tab';
import Clipboard from './panel/clipboard';
import Objectives from './panel/objectives/objectives';
import Quests from './panel/questlog/quests';

function Panel() {

   // LOCAL STATE
   const [local, set_local] = useState({
      objectives: true,
      quests: false
   });

   // TOGGLE PANEL CONTENT
   function toggle() {
      set_local({
         objectives: !local.objectives,
         quests: !local.quests
      });
   }

   return (
      <div id='panel'>
         <div id='status'>
            <Level />
            <Progress />
            <Hearthstone />
            <div id='panel-menu' className='split'>
               <Tab
                  label={ 'Objectives' }
                  func={ toggle }
                  selected={ local.objectives }
               />
               <Tab
                  label={ 'Quests' }
                  func={ toggle }
                  selected={ local.quests }
               />
               <Clipboard />
            </div>
         </div>
         <div id='logs'>
            <div id='overflow-fix'>
               <Objectives visible={ local.objectives } />
               <Quests visible={ local.quests } />
            </div>
         </div>
      </div>
   )
}

export default Panel;