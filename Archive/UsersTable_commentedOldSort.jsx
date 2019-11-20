import React, { Component, Fragment } from 'react';
import { 
  Row, Col, 
  Table, 
  Button, 
  Spinner, 
  InputGroup, InputGroupAddon, Input, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import debounce from 'lodash/debounce';

import { fetchData } from '../../services/api';
import { GET_USERS } from '../../services/urls';
/* import { sortByAlphabet } from '../../utils/sort'; */

import TableHeader from './TableHeader';
import styles from './UsersTable.module.css';
import { tableRows, throttleWait } from '../../services/mock'

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.loadUserData = this.loadUserData.bind(this);
    this.removeUserData = this.removeUserData.bind(this);
    this.handleClickToUserTodos = this.handleClickToUserTodos.bind(this);
    this.handleClickColumnCreator = this.handleClickColumnCreator.bind(this);
    this.handleInputSearchUsernameChange = this.handleInputSearchUsernameChange.bind(this);
    /* this.handleInputSearchUsernameChangeLocal = this.handleInputSearchUsernameChangeLocal.bind(this);
    this.handleClickClearSearchingLocal = this.handleClickClearSearchingLocal.bind(this); */
    this.handleClickSelectCategory = this.handleClickSelectCategory.bind(this);
    this.searchByUsername = this.searchByUsername.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.state = {
      users: [],
      usersTmp: [],
      isLoading: false,
      dataLoaded: false,
      field: null,
      direction: 'desc',
      loadError: false,
      /* searchingUsername: '', */
      searchingUsernameServer: '',
      dropdownOpen: false,
      searchCategory: tableRows[1]
    }
  }

  componentDidMount() {
    this.searchByUsername = debounce(this.searchByUsername, throttleWait);
    this.loadUserData()
  }

  componentDidUpdate(prevProps, prevState) {
    /* const { usersTmp, field, direction } = this.state; */
    const { field, direction } = this.state;
    const { field: prevField, direction: prevDirection } = prevState;

    if (field !== prevField || direction !== prevDirection) {
      /* this.setState({ usersTmp: sortByAlphabet(usersTmp, field, direction) }); */
      this.updateUserData()
    }
  }

  loadUserData() {
    const { searchingUsernameServer } = this.state;
    searchingUsernameServer ? this.searchByUsername(searchingUsernameServer) : this.updateUserData()
  }

  prepareReqParams() {
    const { field, direction, searchCategory: {name: searchCategoryName}, searchingUsernameServer } = this.state;
    let reqParams = []
    searchingUsernameServer && reqParams.push(
      {
        name: 'searchField',
        value: searchCategoryName
      },
      {
        name: 'search',
        value: searchingUsernameServer
      })
    field && reqParams.push(
      {
        name: 'field',
        value: field
      },
      {
        name: 'direction',
        value: direction
      }
    )      
    let _params = reqParams ? '?' : ''
    reqParams.forEach(({ name, value }) => {
      _params += (`${name}=${value}&`)  
    });
    return _params.slice(0, -1)
  }

  updateUserData() {
    this.setState({ 
      isLoading: true,
      /* dataLoaded: false, */ // TODO:
      loadError: false
    })
    fetchData(`${GET_USERS}${this.prepareReqParams()}`).then(({ data, success }) => {
      console.log(`${GET_USERS}${this.prepareReqParams()}`)
      if (success && data) {
        /* const { searchingUsername: userInput } = this.state; */
        /* const users = data.map(({ id, name, username, email, address: { city, street }}) => ({ */
        const users = data.map(({ id, name, username, email, city, street }) => ({
            id,
            name,
            username,
            email,
            city,
            street
          }));
        console.log(users)
        this.setState({
          /* field: null, */
          users,
          usersTmp: users,
          isLoading: false,
          dataLoaded: true,
          searchingUsername: '' // TODO:
        })
        /* this.searchByUsername(userInput) */
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
      usersTmp: [],
      dataLoaded: false,
      field: null,
      direction: 'desc'
    })
  }

  handleClickColumnCreator(field, direction) {
    return this.startSort.bind(this, field, direction);
  }

  startSort(field, direction) {
    const { dataLoaded } = this.state;
    dataLoaded && this.setState({ direction, field });
  }

  handleClickToUserTodos(id) {
    return this.toUserTodos.bind(this, id)
  }

  toUserTodos(id) {
    this.props.history.push(`/users/${id}/todos`);
  }

  /* handleInputSearchUsernameChangeLocal({ target: { value: userInput }}) {
    this.setState({ searchingUsername: userInput });
    this.searchByUsernameLocal(userInput);
  } */

  /* handleClickClearSearchingLocal() {
    this.searchByUsernameLocal('');
  } */

  handleInputSearchUsernameChange({ target: { value: userInput }}) {
    const { dataLoaded } = this.state;
    this.setState({ searchingUsernameServer: userInput });
    dataLoaded && this.searchByUsername(userInput);
  }

  toggleDropDown() {
    const { dropdownOpen } = this.state
    this.setState({ dropdownOpen: !dropdownOpen })
  }

  /* searchByUsernameLocal(userInput) {
    const { users } = this.state
    if (userInput === '') this.setState({ usersTmp: users })
    else {
      const _users = users.filter(({ username }) => username.toLowerCase().match(`^${userInput.toLowerCase()}`))
      this.setState({ usersTmp: _users })
    }
  } */

  searchByUsername(userInput) {
    this.updateUserData()
  }

  handleClickSelectCategory(name) {
    return this.selectCategory.bind(this, name)
  }

  selectCategory(name) {
    const { searchingUsernameServer, dataLoaded } = this.state;
    let rowData = tableRows.find(_rowData => _rowData.name === name)
    this.setState({ searchCategory: rowData })
    dataLoaded && this.searchByUsername(searchingUsernameServer)
  }

  render() {
    const { usersTmp: users, isLoading, dataLoaded, field, direction, loadError, /* searchingUsername, */ dropdownOpen, searchingUsernameServer, searchCategory } = this.state
    return (
      <Fragment>
        <h2 className={styles.tableHeader}>Таблица юзеров</h2>
        <Row className={styles.headerRow}>
          <Col sm="5">
            <InputGroup className={styles.paddingSM}>
              <InputGroupAddon addonType="prepend">Логин</InputGroupAddon>
              <Input 
                name="searchUsername" 
                type="text"
                disabled
                /* value={searchingUsername} */ 
                /* onChange={this.handleInputSearchUsernameChangeLocal} */ 
                placeholder="Поддержка поиска на клиенте отключена"
              />
              <InputGroupAddon addonType="append">
                <Button color="secondary" onClick={this.handleClickClearSearchingLocal}>Очистить</Button>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className={styles.paddingSM}>
              <InputGroupButtonDropdown 
                addonType="append" 
                isOpen={dropdownOpen} 
                toggle={this.toggleDropDown}
              >
                <DropdownToggle caret>
                  {searchCategory.title ? searchCategory.title : 'Выберите категорию'}
                </DropdownToggle>
                <DropdownMenu>
                  {
                    tableRows.map(({ name, title }) => {
                      return (
                        <DropdownItem key={name} onClick={this.handleClickSelectCategory(name)}>{title}</DropdownItem>
                      )}
                    )
                  }
                </DropdownMenu>
              </InputGroupButtonDropdown>
              <Input
                name="searchByServer" 
                type="text" 
                value={searchingUsernameServer} 
                onChange={this.handleInputSearchUsernameChange} 
                placeholder="Поиск через сервер"
              />
            </InputGroup>
          </Col>
          <Col sm="7" className={styles.uploadBtn}>
            {dataLoaded ? 
              (<Button color="danger" onClick={this.removeUserData}>
                Очистить таблицу
              </Button>)
              :
              (<Button outline color="info" onClick={this.loadUserData}>
                Загрузить данные
              </Button>)
            } {loadError &&
              <p className={styles.redText}>Ошибка загрузки :(</p>
            }
          </Col>
        </Row>
        <Table striped>
          <TableHeader field={field} direction={direction} handleClickColumnCreator={this.handleClickColumnCreator} />
          <tbody>
            {
              users && users.map(({id, name, username, email, city, street}, index) => {
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
