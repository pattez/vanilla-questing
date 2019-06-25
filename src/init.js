import { useContext, useEffect } from 'react';
import { Context } from "./context";
import { random, specific, dev } from './funcs/build';
import { check as check_storage } from './funcs/storage';
import { check as check_settings } from './funcs/settings';

function Init() {

   // ROUTE CONTEXT
   const { dispatch } = useContext(Context);

   // ARE YOU DEVELOPING
   const developing = true;

   // ON INITIAL PAGE LOAD
   useEffect(() => {

      // CHECK STORAGE HEALTH
      check_storage().then(profiles => {

         // CHECK SETTINGS HEALTH
         const settings = check_settings();

         // WHEN DEVELOPING
         // if (developing) {

         //    // FETCH DEV BUILD & LAST DEV BLOCK
         //    const build = dev();
         //    const dev_block = profiles.get('dev').block;

         //    // IF DEV BLOCK IS IN RANGE
         //    if (build.data.route.length >= dev_block) {

         //       // OVERWRITE DEFAULT CURRENT
         //       build.current = dev_block

         //    // OTHERWISE, DEFAULT TO ZERO & LOG ERROR
         //    } else { console.log('Block limit exceeded. Defaulting to zero!'); }

         //    // LOAD DEV BUILD
         //    dispatch({
         //       type: 'load',
         //       payload: build
         //    })

         //    // SET LOADED PROFILE TO 'DEV'
         //    dispatch({
         //       type: 'loaded',
         //       payload: 'dev'
         //    })

         // // OTHERWISE, LOAD RANDOM ROUTE
         // } else {

            // IF ROUTE REQUEST IS UNDEFINED, LOAD RANDOM ROUTE
            if (window.request === undefined) {
               dispatch({
                  type: 'load',
                  payload: random()
               })

            // OTHERWISE, PROCESS THE REQUEST & LOAD IT
            } else {
               dispatch({
                  type: 'load',
                  payload: specific(window.request)
               })
            }
         // }

         // IRREGARDLESS, UPDATE STORAGE STUFF IN STATE
         dispatch({
            type: 'storage',
            payload: {
               profiles: profiles,
               settings: settings
            }
         })

         // FINALLY, HIDE PROMPT
         dispatch({ type: 'hide-prompt' })
      })
   }, [])

   return null;
}

export default Init;
