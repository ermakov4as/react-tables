import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeInfo from './modules/HomeInfo';
import UsersTable from './modules/UsersTable/UsersTable';
import UserTodos from './modules/UserTodos/UserTodos';

import store from './store';
import styles from './App.module.css'

const App = () => (
  <div className={styles.container}>
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={HomeInfo} />
        <Route exact path='/users' component={UsersTable} />
        <Route exact path='/users/:id/todos' component={UserTodos} />
      </Switch>
    </Router>
  </Provider>
  </div>
);

export default App;
