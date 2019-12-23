import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { Button, ListGroup, ListGroupItem, Spinner } from 'reactstrap';

import { getIsFetching, getIsFetched } from 'common/selectors/fetcher';
import { FETCH_TODOS } from 'common/constants/actionTypes';
import { getTodos, getIsTodosFetchError } from './selectors/todos';
import { fetchTodos } from './actions/todos';

import styles from './UsersTodos.module.css';


function UserTodos() {
  const history = useHistory();
  const { id } = useParams();

  const dispatch = useDispatch();

  const todos = useSelector(state => getTodos(state));
  const fetchError = useSelector(state => getIsTodosFetchError(state));
  const isFetching = useSelector(state => getIsFetching(state)[FETCH_TODOS]);
  const dataLoaded = useSelector(state => getIsFetched(state)[FETCH_TODOS]);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(fetchTodos(id));
  }, [dispatch, id]);
  
  return (
    <>
      <h4>UserTodos</h4>
      <p>
        User: #
        { id }
      </p>
      <Button outline color="danger" onClick={goBack} className={styles.btnMargin}>Назад</Button>
      <ListGroup>
        {todos && todos.map(({id, title, completed}) => (
          <ListGroupItem key={id+title} color={completed ? 'success' : 'danger'} className={styles.pointer}>
            {title}
          </ListGroupItem>
        ))}
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

export default UserTodos;