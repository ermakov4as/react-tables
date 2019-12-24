import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Spinner } from 'reactstrap';

import { getIsFetching, getIsFetched } from 'common/selectors/fetcher';
import { FETCH_USERS } from 'common/constants/actionTypes';

import TableHeader from './components/TableHeader';
import styles from './UsersTable.module.css';
import UserFilter from './components/UserFilter';

import { fetchUsers } from './actions/users';
import { getUsers } from './selectors/users';
import { getFilters } from './selectors/filters';


const UsersTable = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const users = useSelector(state => getUsers(state));
  const isFetching = useSelector(state => getIsFetching(state)[FETCH_USERS]);
  const filters = useSelector(state => getFilters(state));
  const dataLoaded = useSelector(state => getIsFetched(state)[FETCH_USERS]);

  const { field, direction, fromMoscow, filterMail, searchField, searchingInput } = filters;

  const updateUserData = () => {
    const filterParams = {
      searchField,
      search: searchingInput,
      field,
      direction,
      fromMoscow,
      filterMail
    };
    dispatch(fetchUsers(filterParams));
  };

  useEffect(() => {
    updateUserData()
    // eslint-disable-next-line
  }, [field, direction, fromMoscow, filterMail, searchField]);

  const handleClickToUserTodos = (id) => () => {
    history.push(`/users/${id}/todos`);
  };

  return (
    <>
      <h2 className={styles.center}>Таблица юзеров</h2>
      <UserFilter
        updateUserData={updateUserData}
      />
      <Table striped className={styles.tableUsers}>
        <TableHeader />
        <tbody className={styles.tbodyUsers}>
          {
            users.map(({id, name, username, email, city, street}, index) => {
              return (
                <tr key={id} onClick={handleClickToUserTodos(id)} className={`${styles.pointer} ${styles.trUsers}`}>
                  <td className={`${styles.tdUsers} ${styles.tableColumnSm}`}>{index+1}</td>
                  <td className={styles.tdUsers}>{name}</td>
                  <td className={styles.tdUsers}>{username}</td>
                  <td className={`${styles.tdUsers} ${styles.tableColumnL}`}>{email}</td>
                  <td className={styles.tdUsers}>{city}</td>
                  <td className={styles.tdUsers}>{street}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
        {!dataLoaded && !isFetching &&
          <h6 className={styles.center}>Данные не загружены</h6>}
        {dataLoaded && !isFetching && !users.length &&
          <h6 className={styles.center}>Ничего не найдено . . .</h6>}
        {isFetching && (
          <div className={styles.center}>
            <Spinner size="xl" color="primary" />
          </div>
        )}
    </>
  );
};

export default UsersTable;
