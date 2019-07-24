import React, { useContext  } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from './context';
import './interface/css/general.scss';

import Home from './pages/home';
import Manifesto from './pages/manifesto';
import Target from './pages/target';
import Settings from './pages/settings';
import Error from './pages/error';

function Pages() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // IF ROUTE & SETTINGS DATA HAS LOADED, RENDER PAGES NORMALLY
   if (state.data !== null && state.settings !== null) { return (
      <Switch>
         <Route exact path={ '/' } component={ Home } />
         <Route path={ '/manifesto' } component={ Manifesto } />
         <Route path={ '/:race/:block' } component={ Target } />
         <Route path={ '/settings' } component={ Settings } />
         <Route component={ Error } />
      </Switch>

   // OTHERWISE, RENDER NOTHING
   )} else { return null; }
}

export default Pages;