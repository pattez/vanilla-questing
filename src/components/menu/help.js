import React, { useContext } from 'react';
import { Context } from "../../context";

import Main from './main';
import Sub from './sub';

function Help() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // REFERENCES PROMPT
   function references() {
      dispatch({
         type: 'show-prompt',
         payload: 'references'
      })
   }

   return (
      <Main header='Help'>
         <Sub
            header={ 'References' }
            icon={ 'references' }
            func={ references }
         />
         <Sub
            header={ 'Report Issues' }
            icon={ 'report' }
            link={ '/manifesto#contribute' }
         />
         <Sub
            header={ 'Donate' }
            icon={ 'donate' }
            link={ '/manifesto#contribute' }
         />
      </Main>
   )
}

export default Help;