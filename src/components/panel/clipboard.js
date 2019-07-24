import React, { useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Context } from "../../context";

function Clipboard() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // SEND FRONTEND MESSAGE ON COPY
   function message() {
      dispatch({
         type: 'show-message',
         payload: {
            type: 'good',
            value: 'link copied to clipboard'
         }
      })
   }

   return (
      <CopyToClipboard text={ 'http://vanilla-questing.me/' + state.data.race + '/' + state.current } onCopy={ message }>
         <div id={ 'link' }>Link</div>
      </CopyToClipboard>
   )
}

export default Clipboard;