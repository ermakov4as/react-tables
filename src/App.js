import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeInfo from './modules/HomeInfo'
import { Provider } from 'react-redux';
import UsersTable from './modules/UsersTable/UsersTable'
import UserTodos from './modules/UserTodos/UserTodos'

import store from './store';

const App = () => (
  <Provider store={store} >
    <Router>
      <Switch>
        <Route exact path='/' component={HomeInfo}/>
        <Route exact path='/users' component={UsersTable}/>
        <Route exact path='/users/:id/todos' component={UserTodos}/>
      </Switch>
    </Router>
  </Provider>
)

export default App
