import React, { useContext, useState } from 'react';
import { Context } from "../context";

import EventListener from 'react-event-listener';
import { key_listener } from '../funcs/browsing';
import {authenticate} from '../libs/authentication';

import '../interface/css/innerbody.scss';

import Message from '../components/message';
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
   const key_event = (event) => {
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


   if(!state.keyup) {
      state.keyup = true;
      document.addEventListener('keyup', function (e) {
         if(e.keyCode === 13) {
            const loginButton = document.querySelector('#loginButton');
            if (loginButton) {
               loginButton.click();
            }
         }
      })
   }
   if (!state.authorized && prompt && !prompt.visible) {
      return(
         <div id={'innerbody'}>
            <div className={'login'}>
            <div className="form">
               <div className="noYou">
               You suck man
               </div>
               Username:
               <input id="username" type="text" autoFocus></input>
               Password:
               <input id="password" type="password"></input>
               <button id="loginButton" onClick={login}>Login</button>
            </div>
            </div>
         </div>
      )
   } else if (state.data !== null && state.authorized) {
      return (
         <div id={ 'innerbody' }>
            <EventListener
               target={ document }
               onKeyDown={ key_event }
            />
            <Message />
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

   // OTHERWISE, RETURN NOTHING
   } else { return null; }
}

export default Home;
