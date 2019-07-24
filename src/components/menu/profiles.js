import React, { useContext } from 'react';
import { Context } from "../../context";
import { specific } from '../../funcs/build';
import Main from './main';

// ALL PROFILES
function Profiles({ hide }) {

   // ROUTE STATE
   const { state, dispatch } = useContext(Context);

   // REMOVE PROFILE
   function remove(name) {

      // REMOVE PROFILE FROM PROFILES HASHMAP
      state.profiles.delete(name);

      // UPDATE STORAGE
      dispatch({
         type: 'remove-profile',
         payload: {
            profiles: state.profiles,
            msg: 'profile "' + header + '" removed'
         }
      })

      // HIDE SUBMENU
      hide();
   }

   // LOAD PROFILE
   function load(header, details) {

      // UPDATE STORAGE
      dispatch({
         type: 'load-profile',
         payload: {
            build: specific(details),
            profile: header,
            msg: 'profile "' + header + '" loaded'
         }
      })

      // HIDE SUBMENU
      hide();
   }

   // IF PROFILES HAVE LOADED
   if (state.profiles !== null && state.profiles.size !== 0) {

      // CONVERT TO MAPPABLE ARRAY
      const profiles = Array.from(state.profiles);

      // GENERATE & RETURN PROFILE ROWS
      return profiles.map((item, index) =>
         <Main header='Load Progress'>
            <Profile
               key={ index }
               header={ item[0] }
               details={ item[1] }
               remove={ remove }
               load={ load }
               state={ state }
            />
         </Main>
      )

   // OTHERWISE, RETURN FALLBACK TEXT
   } else { return (
      <Main header='Load Progress'>
         <div className="dead">No Profiles Found</div>
      </Main>
   )}
}

// PROFILE ROW
function Profile({ header, details, load, remove, state }) {
   switch(state.loaded) {

      // IS LOADED
      case header: { return (
         <div className={ 'item' } id={ 'loaded' }>
            <div className={ 'icon' } id={ details.race } />
            <div className={ 'header' }>{ header }</div>
            <div className={ 'loaded' }>Loaded</div>
         </div>
      )}

      // OTHERWISE
      default: { return (
         <div className={ 'item' } onClick={() => { load(header, details) }}>
            <div className={ 'icon' } id={ details.race } />
            <div className={ 'header' }>{ header }</div>
            <div className={ 'action' } id={ 'remove' } />
         </div>
      )}
   }
}

export default Profiles;