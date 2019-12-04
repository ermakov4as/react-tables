import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Spinner } from 'reactstrap';
import debounce from 'lodash/debounce';

import fetchData from 'common/services/api';
import { GET_USERS } from 'common/services/urls';
import reqParams from 'common/utils/reqParams';
import { throttleWait } from 'common/services/mock';

import TableHeader from './components/TableHeader';
import styles from './UsersTable.module.css';
import UserFilter from './components/UserFilter';

import { setUsers, resetUsers } from './actions/users';
import { setFilters } from './actions/filters';
import { getUsers } from './selectors/users';
import { getFilters } from './selectors/filters';

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.removeUserData = this.removeUserData.bind(this);
    this.handleClickToUserTodos = this.handleClickToUserTodos.bind(this);
    this.searchWithDebounce = this.searchWithDebounce.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.state = {
      isLoading: false,
      dataLoaded: false,
      loadError: false
    };
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
    this.setState({ 
      isLoading: true,
      dataLoaded: false,
      loadError: false
    });
    const urlParams = reqParams([ {
        name: 'searchField',
        value: searchCategoryName,
        notIncludeToReq: !searchingInput
      }, {
        name: 'search',
        value: searchingInput,
        notIncludeToReq: !searchingInput
      }, {
        name: 'field',
        value: field
      }, {
        name: 'direction',
        value: direction
      }, {
        name: 'fromMoscow',
        value: fromMoscow,
        notIncludeToReq: !fromMoscow
      }, {
        name: 'filterMail',
        value: filterMail,
        notIncludeToReq: !filterMail
      } ]);
    fetchData(`${GET_USERS}${urlParams}`).then(({ data: users, success }) => {
      if (success && users) {
        this.setState({
          isLoading: false,
          dataLoaded: true
        });
        this.props.setUsers(users);
      } else {
        this.setState({ 
          isLoading: false,
          loadError: true
        });
      };
    });
  };

  removeUserData() {
    this.setState({ dataLoaded: false });
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
    const { isLoading, dataLoaded, loadError } = this.state;
    const { users } = this.props;
    return (
      <>
        <h2 className={styles.tableHeader}>Таблица юзеров</h2>
        <UserFilter
          dataLoaded={dataLoaded}
          isLoading={isLoading}
          loadError={loadError}
          removeUserData={this.removeUserData}
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
          {!dataLoaded && !isLoading &&
            <h6 className={styles.center}>Данные не загружены</h6>}
          {dataLoaded && !isLoading && !users.length &&
            <h6 className={styles.center}>Ничего не найдено . . .</h6>}
          {isLoading && (
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
  filters: getFilters(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setUsers,
    resetUsers,
    setFilters
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
