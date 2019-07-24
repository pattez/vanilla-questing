import { useContext, useEffect } from 'react';
import { Context } from "./context";

import { random } from './funcs/build';
import { check as check_storage } from './funcs/storage';
import { check as check_settings } from './funcs/settings';

function Init() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // ON INITIAL PAGE LOAD
   useEffect(() => {

      // CHECK LOCALSTORAGE HEALTH
      const profiles = check_storage();
      const settings = check_settings();

      // GENERATE RANDOM BUILD
      const build = random();

      // SET GLOBAL STATE & STOP LOADING
      dispatch({
         type: 'init',
         payload: {
            profiles: profiles,
            settings: settings,
            data: build.data,
            current: build.current
         }
      })
   }, [])

   return null;
}

export default Init;
