import React, { Component, Fragment } from 'react';
import { Table, Button, Spinner } from 'reactstrap';
/* import { useHistory } from "react-router-dom"; */
import { Link } from 'react-router-dom';

import { getFetchData/* getUsers */ } from '../../services/api';
import { GET_USERS } from '../../services/urls';
import { sortByAlphabet } from '../../utils/sort';

import TableHeader from './TableHeader';

import styles from './UsersTable.module.css';

/* import { TableRow } from './TableRow'; */
/* import cx from 'classnames'; */

const inverted = {
  asc: 'desc',
  desc: 'asc'
}

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.loadUserData = this.loadUserData.bind(this);
    this.removeUserData = this.removeUserData.bind(this);
    this.state = {
      users: [],
      isLoading: false,
      dataLoaded: false,
      field: 'name',
      direction: 'desc',
      loadError: false
    }
  }

  loadUserData() {
    this.setState({ 
      isLoading: true,
      loadError: false
    })
    getFetchData(GET_USERS).then(res => 
      res.success ? this.setState({ 
        users: res.data,
        isLoading: false,
        dataLoaded: true,
        field: null
      }) : this.setState({ 
        isLoading: false,
        loadError: true
      })
    )
  }
  removeUserData() {
    this.setState({
      users: [],
      dataLoaded: false,
      field: null,
      direction: 'desc'
    })
  }

  handleClickColumnCreator(field, direction) {
    return this.prepareFilter.bind(this, field, direction);
  }
  prepareFilter(field, direction) {
    let _dir
    (this.state.field === name) ? (_dir = inverted[this.state.direction]) : (_dir = 'desc')
    this.setState({
      direction: _dir,
      field: name
    })
    let keyname = name;
    (name === 'city' || name === 'street') && (keyname = 'address.' + keyname)
    this.setState({ users: sortByAlphabet(this.state.users, keyname, _dir) })
  }

  toUserTodos(id) {
    /* let history = useHistory(); */
    console.log(id)
    /* history.pushState(null, `/users/${id}/todos`) */ // TODO: На каждом сайте своя инфа про роутинг, они не совпадают и все громоздкие
  }

  render() {
    const { users, isLoading, dataLoaded, field, direction, loadError } = this.state
    return (
      <Fragment>
        <h2 className={styles.tableHeader}>Таблица юзеров</h2>
        <div className={styles.uploadBtn}>
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
        </div>
        <Table striped>
          <thead>
            <Header field={field} direction={direction} handleClickColumnCreator={this.handleClickColumnCreator} />
            <tr>
              <th>#</th>
              <TableHeader 
                name='name'
                title='Имя'
                field={field}
                direction={direction}
                handleClickColumnCreator={this.handleClickColumnCreator}
                sortingDown={field==='name' && direction==='desc'} 
                sortingUp={field==='name' && direction==='asc'}
                /*onClick={ () => this.state.field === 'user' -> this.setState(direction: inverted[this.state.direction]) : this.setState({direction: 'desc'})}*/
                onClick={ () => this.prepareFilter('name') }
                
              />
              <TableHeader 
                name='username'
                title='Логин'
                sortingDown={field==='username' && direction==='desc'} 
                sortingUp={field==='username' && direction==='asc'}
                onClick={ () => this.prepareFilter('username') }
              />
              <TableHeader 
                name='email'
                title='Email'
                sortingDown={field==='email' && direction==='desc'} 
                sortingUp={field==='email' && direction==='asc'}
                onClick={ () => this.prepareFilter('email') }
              />
              <TableHeader 
                name='city'
                title='Город'
                sortingDown={field==='city' && direction==='desc'} 
                sortingUp={field==='city' && direction==='asc'}
                onClick={ () => this.prepareFilter('city') }
              />
              <TableHeader 
                name='street'
                title='Улица'
                sortingDown={field==='street' && direction==='desc'} 
                sortingUp={field==='street' && direction==='asc'}
                onClick={ () => this.prepareFilter('street') }
              />
            </tr>
          </thead>
          <tbody>
            {
            users && users.map(({id, name, username, email, address: {city, street}}, index) => {
                return (
                  <tr key={email} onClick={ () => this.toUserTodos(id) } >
                    <td className={styles.pointer}><Link to={`/users/${id}/todos`}>{index+1}</Link></td>
                    <td>{name}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{city}</td>
                    <td>{street}</td>
                  </tr>
                )
              })
              /* users.map((user) => {
                const a= 15
                return (
                  <TableRow user={user}  key={user.email}/>
                )
              }) */
            }
          </tbody>
        </Table>
          {isLoading &&
            <div className={styles.spinner}>
              <Spinner size="xl" color="primary" />
            </div>
          }
      </Fragment>
    )
  }
}

export default UsersTable
