import React, { Component, Fragment } from 'react';
import { Row, Col, Table, Button, Spinner, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import { getFetchData } from '../../services/api';
import { GET_USERS } from '../../services/urls';
import { sortByAlphabet } from '../../utils/sort';

import TableHeader from './TableHeader';
import styles from './UsersTable.module.css';

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.loadUserData = this.loadUserData.bind(this);
    this.removeUserData = this.removeUserData.bind(this);
    this.handleClickToUserTodos = this.handleClickToUserTodos.bind(this);
    this.handleClickColumnCreator = this.handleClickColumnCreator.bind(this);
    this.handleInputSearchUsernameChange = this.handleInputSearchUsernameChange.bind(this);
    this.handleClickRemoveSearching = this.handleClickRemoveSearching.bind(this);
    this.searchByUsername = this.searchByUsername.bind(this);
    this.state = {
      users: [],
      usersTmp: [],
      isLoading: false,
      dataLoaded: false,
      field: null,
      direction: 'desc',
      loadError: false,
      searchingUsername: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { usersTmp, field, direction } = this.state;
    const { field: prevField, direction: prevDirection } = prevState;

    if (field !== prevField || direction !== prevDirection) {
      this.setState({ usersTmp: sortByAlphabet(usersTmp, field, direction) });
    }
  }

  loadUserData() {
    this.setState({ 
      isLoading: true,
      loadError: false
    })
    getFetchData(GET_USERS).then(({ data, success }) => {
      if (success && data) {
        const { searchingUsername: userInput } = this.state;
        const users = data.map(({ id, name, username, email, address: { city, street }}) => ({
            id,
            name,
            username,
            email,
            city,
            street
          }));
        this.setState({
          field: null,
          users,
          usersTmp: users,
          isLoading: false,
          dataLoaded: true
        })
        this.searchByUsername(userInput)
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
    this.setState({ direction, field });
  }

  handleClickToUserTodos(id) {
    return this.toUserTodos.bind(this, id)
  }

  toUserTodos(id) {
    this.props.history.push(`/users/${id}/todos`);
  }

  handleInputSearchUsernameChange(e) {
    const { target: { value: userInput }} = e
    this.searchByUsername(userInput);
  }

  handleClickRemoveSearching() {
    const userInput = '';
    this.searchByUsername(userInput);
  }

  searchByUsername(userInput) {
    this.setState({ searchingUsername: userInput }); // TODO: способ 2: здесь оставить только эту строчку, остальное в render через if
    const { users } = this.state
    if (userInput === '') this.setState({ usersTmp: users })
    else {
      const _users = users.filter(user => user.username.indexOf(userInput) +1);
      this.setState({ usersTmp: _users })
    }
  }

  render() {
    const { usersTmp: users, isLoading, dataLoaded, field, direction, loadError, searchingUsername } = this.state
    return (
      <Fragment>
        <h2 className={styles.tableHeader}>Таблица юзеров</h2>
        <Row className={styles.headerRow}>
          <Col sm="5">
          <InputGroup>
            <InputGroupAddon addonType="prepend">Логин</InputGroupAddon>
            <Input 
              name="searchUsername" 
              type="text" 
              value={searchingUsername} 
              onChange={this.handleInputSearchUsernameChange} 
              placeholder="Начните вводить логин"
            />
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={this.handleClickRemoveSearching}>Очистить</Button>
            </InputGroupAddon>
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
