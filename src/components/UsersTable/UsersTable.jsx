import React, { Component, Fragment } from 'react';
import { Table, Spinner } from 'reactstrap';
import debounce from 'lodash/debounce';

import { fetchData } from '../../common/services/api';
import { GET_USERS } from '../../common/services/urls';
import reqParams from '../../common/utils/reqParams';

import TableHeader from './TableHeader';
import styles from './UsersTable.module.css';
import { userParamsNames, throttleWait } from '../../common/services/mock';
import UserFilter from './UserFilter';

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.removeUserData = this.removeUserData.bind(this);
    this.handleClickToUserTodos = this.handleClickToUserTodos.bind(this);
    this.handleClickColumnCreator = this.handleClickColumnCreator.bind(this);
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this);
    this.handleClickSelectCategory = this.handleClickSelectCategory.bind(this);
    this.handleClickClearSearching = this.handleClickClearSearching.bind(this);
    this.handleClickClearMailFilter = this.handleClickClearMailFilter.bind(this);
    this.handleCheckboxFromMoscowChange = this.handleCheckboxFromMoscowChange.bind(this) // TODO:
    this.searchWithDebounce = this.searchWithDebounce.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.handleClickSelectMail = this.handleClickSelectMail.bind(this);
    this.state = {
      users: [],
      isLoading: false,
      dataLoaded: false,
      field: 'username',
      direction: 'desc',
      loadError: false,
      searchingInput: '',
      filterMail: '',
      fromMoscow: false,
      searchCategory: userParamsNames.find(_userData => _userData.name === 'username')
    }
  }

  componentDidMount() {
    this.searchWithDebounce = debounce(this.searchWithDebounce, throttleWait);
    this.updateUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { field, direction, fromMoscow, filterMail } = this.state;
    const { field: prevField, direction: prevDirection, fromMoscow: prevFromMoscow, filterMail: prevFilterMail } = prevState;
    if (field !== prevField || direction !== prevDirection || fromMoscow !== prevFromMoscow || filterMail !== prevFilterMail) {
      this.updateUserData();
    }
  }

  updateUserData() {
    const { field, direction, searchCategory: {name: searchCategoryName}, searchingInput, fromMoscow, filterMail } = this.state;
    this.setState({ 
      isLoading: true,
      dataLoaded: false,
      loadError: false
    })
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
      } ])
    fetchData(`${GET_USERS}${urlParams}`).then(({ data: users, success }) => {
      if (success && users) {
        this.setState({
          users,
          isLoading: false,
          dataLoaded: true,
          searchingUsername: ''
        })
      } else {
        this.setState({ 
          isLoading: false,
          loadError: true
        })
      }
    })
  }

  removeUserData() {
    this.setState({
      users: [],
      dataLoaded: false,
      direction: 'desc'
    })
  }

  handleClickColumnCreator(field, direction) {
    return this.sortData.bind(this, field, direction);
  }

  sortData(field, direction) {
    this.setState({ direction, field });
  }

  handleClickToUserTodos(id) {
    return this.toUserTodos.bind(this, id);
  }

  toUserTodos(id) {
    this.props.history.push(`/users/${id}/todos`);
  }

  handleInputSearchChange({ target: { value: userInput }}) {
    this.setState({ searchingInput: userInput });
    this.searchWithDebounce();
  }

  searchWithDebounce() { 
    this.updateUserData();
  }

  handleClickSelectCategory(name) {
    return this.selectCategory.bind(this, name);
  }

  handleClickClearSearching() {
    this.setState({ searchingInput: '' })
    this.searchWithDebounce();
  }

  handleClickClearMailFilter() {
    this.setState({ filterMail: '' })
  }

  selectCategory(name) {
    let userData = userParamsNames.find(_userData => _userData.name === name);
    this.setState({ searchCategory: userData });
    this.searchWithDebounce();
  }

  handleCheckboxFromMoscowChange() {
    const { fromMoscow } = this.state;
    this.setState({ fromMoscow: !fromMoscow });
  }

  handleClickSelectMail({ target: { value: mail }}) {
    this.setState({ filterMail: mail });
    this.searchWithDebounce();
  }

  render() {
    const { users, isLoading, dataLoaded, field, direction, loadError, searchingInput, searchCategory, fromMoscow, filterMail} = this.state
    return (
      <Fragment>
        <h2 className={styles.tableHeader}>Таблица юзеров</h2>
        <UserFilter
          searchCategory={searchCategory}
          dataLoaded={dataLoaded}
          isLoading={isLoading}
          loadError={loadError}
          removeUserData={this.removeUserData}
          updateUserData={this.updateUserData}
          handleClickClearSearching={this.handleClickClearSearching}
          handleClickClearMailFilter={this.handleClickClearMailFilter}
          searchingInput={searchingInput}
          filterMail={filterMail}
          fromMoscow={fromMoscow}
          handleCheckboxFromMoscowChange={this.handleCheckboxFromMoscowChange}
          handleInputSearchChange={this.handleInputSearchChange}
          handleClickSelectCategory={this.handleClickSelectCategory}
          handleClickSelectMail={this.handleClickSelectMail}
        />
        <Table striped>
          <TableHeader field={field} direction={direction} handleClickColumnCreator={this.handleClickColumnCreator} />
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
                )
              })
            }
          </tbody>
        </Table>
          {!dataLoaded && !isLoading &&
            <h6 className={styles.center}>Данные не загружены</h6>
          }
          {dataLoaded && !isLoading && !users.length &&
            <h6 className={styles.center}>Ничего не найдено . . .</h6>
          }
          {isLoading &&
            <div className={styles.center}>
              <Spinner size="xl" color="primary" />
            </div>
          }
      </Fragment>
    )
  }
}

export default UsersTable;
