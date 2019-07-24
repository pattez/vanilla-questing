import React, { useContext } from 'react';
import { Context } from "../../context";

import { preload_bgs } from "../../funcs/misc";

import Main from './main';
import Sub from './sub';

function Actions() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // IMPORT CUSTOM ROUTE
   function custom() {
      dispatch({
         type: 'show-prompt',
         payload: 'import-route'
      })
   }

   // PRELOAD BACKGROUNDS
   function preload() {
      preload_bgs(dispatch);
   }

   return (
      <Main header='Actions'>
         <Sub
            header={ 'Preload Backgrounds' }
            icon={ 'preload' }
            func={ preload }
         />
         <Sub
            header={ 'Import Custom Route' }
            icon={ 'import' }
            func={ custom }
         />
      </Main>
   )
}

export default Actions;