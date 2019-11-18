import React, { Fragment, Component } from 'react';
import { Button } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { fetchData } from '../../services/api';
import { GET_USER_TODOS } from '../../services/urls';

import styles from './UsersTodos.module.css';

class UserTodos extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = { todos: [] }
  }

  componentDidMount() {
    const { match: { params: { id }}} = this.props;
    fetchData(GET_USER_TODOS(id)).then(({ data, success }) => {
      success && (this.setState({ todos: data }))
    })
  }

  goBack() {
    this.props.history.push('/users');
  }
  
  render() {
    const { todos } = this.state;
    const { match: { params: { id }}} = this.props;
    return (
      <Fragment>
        <h4>UserTodos</h4>
        <p>User: #{id}</p>
        <Button outline color="danger" onClick={this.goBack} className={styles.btnMargin}>Назад</Button>
        <ListGroup>
          {todos && todos.map(({id, title, completed}, index) => {
            return (
              <ListGroupItem key={index * id} color={completed ? 'success' : 'danger'} className={styles.pointer}>
                {title}
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </Fragment>
    )
  }
}

export default UserTodos