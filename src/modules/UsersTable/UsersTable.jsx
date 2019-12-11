import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Spinner } from 'reactstrap';
import debounce from 'lodash/debounce';

import { throttleWait } from 'common/services/mock';

import TableHeader from './components/TableHeader';
import styles from './UsersTable.module.css';
import UserFilter from './components/UserFilter';

import { setUsers, resetUsers, fetchUsers } from './actions/users';
import { setFilters } from './actions/filters';
import { getUsers, getAreUsersLoaded } from './selectors/users';
import { getFilters } from './selectors/filters';
import { getIsFetching } from 'common/selectors/fetcher';

import { FETCH_USERS } from 'common/constants/actionTypes';

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.removeUserData = this.removeUserData.bind(this);
    this.handleClickToUserTodos = this.handleClickToUserTodos.bind(this);
    this.searchWithDebounce = this.searchWithDebounce.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
  };

  componentDidMount() {
    this.searchWithDebounce = debounce(this.searchWithDebounce, throttleWait);
    this.updateUserData();
  };

  componentDidUpdate(prevProps) {
    const { filters: { field, direction, fromMoscow, filterMail, searchingInput, searchCategory: { name: searchCategoryName } } } = this.props;
    const { filters: { field: prevField, direction: prevDirection, fromMoscow: prevFromMoscow, 
      filterMail: prevFilterMail, searchingInput: prevSearchingInput, searchCategory: { name: prevSearchCategoryName } } } = prevProps;
    if (field !== prevField || direction !== prevDirection || fromMoscow !== prevFromMoscow || filterMail !== prevFilterMail ||
      searchCategoryName !== prevSearchCategoryName) {
        this.updateUserData();
    };
    if (searchingInput !== prevSearchingInput) {
      this.searchWithDebounce();
    };
  };

  updateUserData() {
    const { filters: { field, direction, searchingInput, fromMoscow, filterMail, searchCategory: {name: searchCategoryName} } } = this.props;
    const filterParams = {
      searchField: searchCategoryName,
      search: searchingInput,
      field,
      direction,
      fromMoscow,
      filterMail
    };
    this.props.fetchUsers(filterParams);
  };

  removeUserData() {
    this.props.resetUsers();
  };

  handleClickToUserTodos(id) {
    return this.toUserTodos.bind(this, id);
  };

  toUserTodos(id) {
    this.props.history.push(`/users/${id}/todos`);
  };

  searchWithDebounce() { 
    this.updateUserData();
  };

  render() {
    const { users, isFetching, dataLoaded } = this.props;
    return (
      <>
        <h2 className={styles.tableHeader}>Таблица юзеров</h2>
        <UserFilter
          updateUserData={this.updateUserData}
        />
        <Table striped>
          <TableHeader />
          <tbody>
            {
              users.map(({id, name, username, email, city, street}, index) => {
                return (
                  <tr key={id} onClick={this.handleClickToUserTodos(id)} className={styles.pointer}>
                    <td>{index+1}</td>
                    <td>{name}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{city}</td>
                    <td>{street}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
          {!dataLoaded && !isFetching &&
            <h6 className={styles.center}>Данные не загружены</h6>}
          {dataLoaded && !isFetching && !dataLoaded &&
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
  users: getUsers(state),
  isFetching: getIsFetching(state)[FETCH_USERS],
  filters: getFilters(state),
  dataLoaded: getAreUsersLoaded(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setUsers, resetUsers, fetchUsers,
    setFilters
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
