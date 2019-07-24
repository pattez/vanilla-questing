import React, { createContext, useReducer } from "react";
import { update as update_profiles, change } from "./funcs/storage";
import { update_bind, update_prop } from "./funcs/settings";

// DECLARE CONTEXT
const Context = createContext();

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      // ON THE INITIAL PAGE LOAD
      case 'init': {
         return {
            ...state,
            profiles: action.payload.profiles,
            settings: action.payload.settings,
            data: action.payload.data,
            current: action.payload.current,
            prompt: {
               ...state.prompt,
               visible: false
            }
         }
      }

      // LOAD PROFILE
      case 'load-profile': {
         return {
            ...state,
            data: action.payload.build.data,
            current: action.payload.build.current,
            loaded: action.payload.profile,
            message: {
               visible: true,
               type: 'good',
               value: action.payload.msg
            }
         }
      }

      // REMOVE PROFILE
      case 'remove-profile': {
         return {
            ...state,
            profiles: action.payload.profiles,
            message: {
               visible: true,
               type: 'good',
               value: action.payload.msg
            }
         }
      }

      // OLD STUFF ---------------------------------------------

      // CHANGE BLOCK
      case 'block': {
         return {
            ...state,
            current: change(state, action.payload)
         }
      }

      // LOAD PROFILE
      case 'load': {
         return {
            ...state,
            ...action.payload
         }
      }

      // SET STORED PROFILES/SETTINGS
      case 'storage': {
         return {
            ...state,
            profiles: action.payload.profiles,
            settings: action.payload.settings
         }
      }

      // SET PROFILES ON INIT LOAD
      case 'set_profiles': {
         return {
            ...state,
            profiles: action.payload
         }
      }

      // UPDATE PROFILES
      case 'update_profiles': {
         return {
            ...state,
            profiles: update_profiles(action.payload)
         }
      }

      // SAVE RACE REQUEST DURING PROFILE CREATION
      case 'selected_race': {
         return {
            ...state,
            selected_race: action.payload
         }
      }

      // SHOW PROMPT WITH APPROPARIATE CONTENT
      case 'show-prompt': {
         return {
            ...state,
            prompt: {
               visible: true,
               type: action.payload
            }
         }
      }

      // HIDE PROMPT
      case 'hide-prompt': {
         return {
            ...state,
            prompt: {
               ...state.prompt,
               visible: false
            }
         }
      }

      // CURRENT LOADED PROFILE
      case 'loaded': {
         return {
            ...state,
            loaded: action.payload
         }
      }

      // SHOW MESSAGE
      case 'show-message': {
         return {
            ...state,
            message: {
               visible: true,
               type: action.payload.type,
               value: action.payload.value
            }
         }
      }

      // HIDE MESSAGE
      case 'hide-message': {
         return {
            ...state,
            message: {
               visible: false,
               type: undefined,
               value: undefined
            }
         }
      }

      // CHANGE KEYBIND
      case 'change-keybind': {
         return {
            ...state,
            settings: update_bind(state.settings, action.payload)
         }
      }

      // CHANGE SETTING
      case 'change-setting': {
         return {
            ...state,
            settings: update_prop(state.settings, action.payload)
         }
      }

      // FALLBACK
      default: {
         console.log('Context reducer type not found');
         return state;
      }
   }
}

// CONTEXT PROVIDER
function Provider({ children }) {

   // ATTACH THE REDUCER
   const [state, dispatch] = useReducer(reducer, {
      data: null,
      current: 0,
      profiles: null,
      settings: null,
      authorized: false,
      keyup: false,
      prompt: {
         visible: false,
         type: null
      },

      // OLD
      selected_race: null,
      loaded: null,
      message: {
         visible: false,
         type: undefined,
         value: undefined
      }
   });

   return (
      <Context.Provider value={{ state, dispatch }}>
         { children }
      </Context.Provider>
   );
}

export {
   Context,
   Provider
}
