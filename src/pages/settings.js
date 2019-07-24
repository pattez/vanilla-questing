import React, { useContext } from 'react';
import { Context } from "../context";

import Swapper from '../components/settings/swapper';
import Keybind from '../components/settings/keybind';
import { Redirect } from 'react-router-dom';

import '../interface/css/settings.scss';

function Settings() {

   // GLOBAL CONTEXT
   const { state } = useContext(Context);

   // IF STATE HAS LOADED
   if (state.settings !== null && state.authorized) {
      return (
         <div id={ 'settings' }>
            <div className={ 'header' }>Modify Keybindings</div>
            <div className={ 'container' }>
               <Swapper
                  header={ 'keybinds' }
                  first={ 'enable' }
                  second={ 'disable' }
               />
               <Keybind
                  header={ 'close prompts' }
                  name={ 'close' }
                  bind={ state.settings.binds.close }
               />
               <Keybind
                  header={ 'open references' }
                  name={ 'references' }
                  bind={ state.settings.binds.references }
               />
               <Keybind
                  header={ 'browse backward' }
                  name={ 'backward' }
                  bind={ state.settings.binds.backward }
               />
               <Keybind
                  header={ 'browse forward' }
                  name={ 'forward' }
                  bind={ state.settings.binds.forward }
               />
            </div>
         </div>
      )

   // OTHERWISE, RETURN NOTHING
   } else { return <Redirect to={ '/' } /> }
}

export default Settings;
