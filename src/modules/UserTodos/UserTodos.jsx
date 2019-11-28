import React, { Component } from 'react';
import { Button , ListGroup, ListGroupItem } from 'reactstrap';

import fetchData from 'common/services/api';
import { GET_USER_TODOS } from 'common/services/urls';

import styles from './UsersTodos.module.css';

class UserTodos extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = { todos: [] };
  };

  componentDidMount() {
    const { match: { params: { id }}} = this.props;
    fetchData(GET_USER_TODOS(id)).then(({ data, success }) => {
      if (success) this.setState({ todos: data });
    });
  };

  goBack() {
    this.props.history.push('/users');
  };
  
  render() {
    const { todos } = this.state;
    const { match: { params: { id: routeId }}} = this.props;
    return (
      <>
        <h4>UserTodos</h4>
        <p>
          User: #
          {routeId}
        </p>
        <Button outline color="danger" onClick={this.goBack} className={styles.btnMargin}>Назад</Button>
        <ListGroup>
          {todos && todos.map(({id, title, completed}) => {
            return (
              <ListGroupItem key={id} color={completed ? 'success' : 'danger'} className={styles.pointer}>
                {title}
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </>
    );
  };
};

export default UserTodos;