import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "./context";

import './interface/css/general.scss';

import Init from './init';
import Menu from './components/menu';
import Home from './pages/home';
import Manifesto from './pages/manifesto';
import Target from './pages/target';
import Settings from './pages/settings';
import Error from './pages/error';

function App() {
   return (
         <BrowserRouter>
            <Provider>
               <Init />
               <Menu />
               <Switch>
                  <Route exact path={ '/' } component={ Home } />
                  <Route path={ '/manifesto' } component={ Manifesto } />
                  <Route path={ '/:race/:block' } component={ Target } />
                  <Route path={ '/settings' } component={ Settings } />
                  <Route component={ Error } />
               </Switch>
            </Provider>
         </BrowserRouter>
      )
}

export default App;
