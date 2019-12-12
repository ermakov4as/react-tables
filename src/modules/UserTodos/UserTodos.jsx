import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button , ListGroup, ListGroupItem, Spinner } from 'reactstrap';

import { getTodos, getIsTodosFetchError } from './selectors/todos';
import { fetchTodos } from './actions/todos';
import { getIsFetching, getIsFetched } from 'common/selectors/fetcher';

import styles from './UsersTodos.module.css';
import { FETCH_TODOS } from 'common/constants/actionTypes';


class UserTodos extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = { todos: [] };
  };

  componentDidMount() {
    this.getUserTodos();
  };

  getUserTodos() {
    const { match: { params: { id }}} = this.props;
    this.props.fetchTodos(id);
  };

  goBack() {
    this.props.history.push('/users');
  };
  
  render() {
    const {
      match: { params: { id: routeId } },
      todos,
      fetchError,
      dataLoaded,
      isFetching
    } = this.props;
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
              <ListGroupItem key={id+title} color={completed ? 'success' : 'danger'} className={styles.pointer}>
                {title}
              </ListGroupItem>
            )
          })}
        </ListGroup>
        {fetchError &&
          <h6 className={styles.center}>Ошибка загрузки.</h6>}
        {!dataLoaded && !isFetching &&
          <h6 className={styles.center}>Данные не загружены</h6>}
        {dataLoaded && !isFetching && !todos.length &&
          <h6 className={styles.center}>Ничего не найдено . . .</h6>}
        {isFetching && (
          <div className={styles.center}>
            <Spinner size="xl" color="primary" />
          </div>
        )}
      </>
    );
  };
};

const mapStateToProps = state => ({
  todos: getTodos(state),
  fetchError: getIsTodosFetchError(state),
  isFetching: getIsFetching(state)[FETCH_TODOS],
  dataLoaded: getIsFetched(state)[FETCH_TODOS]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchTodos
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserTodos);