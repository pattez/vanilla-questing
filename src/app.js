import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "./context";

import Init from './init';
import Menu from './components/menu';
import Pages from './pages';
import Prompt from './components/prompt';
import Message from './components/message';

function App() { return (
   <BrowserRouter>
      <Provider>
         <Init />
         <div id={ 'wrapper' }>
            <Menu />
            <Pages />
         </div>
         <Prompt />
         <Message />
      </Provider>
   </BrowserRouter>
)}

export default App;
