import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Home from '../../screens/Home';
import Detail from '../../screens/Detail';

import history from './history';
import {Provider} from '../../AppContext';

const AppRouter = () => {
  return (
    <BrowserRouter history={history}>
      <Provider>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/detail/:region' component={Detail}/>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
