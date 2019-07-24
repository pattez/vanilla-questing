import React, { useContext, useState } from 'react';
import { Context } from "../context";
import '../interface/css/innerbody.scss';

import EventListener from 'react-event-listener';
import { key_listener } from '../funcs/browsing';
import {authenticate} from '../libs/authentication';

import Map from '../components/map';
import Panel from '../components/panel';

function Home() {
   // LOCAL STATE
   const [local, set_local] = useState({
      authorized: false
   })

   // GLOBAL CONTEXT
   const { state, dispatch } = useContext(Context);
   // KEYBOARD EVENT LISTENER
   function key_event(event) {
      key_listener(event, state, dispatch)
   }
   const prompt = state.prompt;

   async function login () {
      const username = document.getElementById('username');
      const password = document.getElementById('password');
      try {
         const {data} = await authenticate(username.value, password.value);
         if (data) {
            state.authorized = true;
            dispatch({type: 'hide-prompt'});
               set_local({
                  authorized: true
               });
         } else {
            state.authorized = false;
            throw Error('Bad login');
         }
      } catch (e) {
         if(!state.authorized) {
            username.style.color = 'red';
            password.style.color = 'red';
            username.style.borderColor = 'red';
            password.style.borderColor = 'red';
         }
      }
   }


   return (
      <div id={ 'innerbody' }>
         <EventListener
            target={ document }
            onKeyDown={ key_event }
         />
         <div className={ 'inner' }>
            <div id={ 'map-wrapper' }>
               <Map />
            </div>
            <div id={ 'panel-wrapper' }>
               <Panel />
            </div>
         </div>
      </div>
   )
}

export default Home;
