import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeInfo from './modules/HomeInfo'
import UsersTable from './modules/UsersTable'
import UserTodos from './modules/UserTodos'

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={HomeInfo}/>
      <Route exact path='/users' component={UsersTable}/>
      <Route exact path='/users/:id/todos' component={UserTodos}/>
    </Switch>
  </Router>
)

export default App
