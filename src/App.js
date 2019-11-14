import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeInfo from './components/HomeInfo'
import UsersTable from './components/UsersTable'
import UserTodos from './components/UserTodos'

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
