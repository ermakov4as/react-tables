import React, { Fragment } from 'react';
import { ReactComponent as SortUp } from '../../assets/sort-up.svg';
import { ReactComponent as SortDown } from '../../assets/sort-down.svg';
import styles from './UsersTable.module.css';

const inverted = {
  asc: 'desc',
  desc: 'asc'
}

const TableHeader = ({ field, direction, handleClickColumnCreator }) => (
  <thead>
    <tr>
      <th>#</th>
      <th onClick={handleClickColumnCreator('name', field === 'name' ? inverted[direction] : 'desc')} className={styles.pointer} >
        <span>Имя</span>
          {field === 'name' && 
            <Fragment>
              <span>{ direction==='asc' && <SortUp className={styles.sortIcon} /> }</span>
              <span>{ direction==='desc' && <SortDown className={styles.sortIcon} /> }</span>
            </Fragment>
          }
      </th>
      <th onClick={handleClickColumnCreator('username', field === 'username' ? inverted[direction] : 'desc')} className={styles.pointer} >
        <span>Логин</span>
          {field === 'username' && 
            <Fragment>
              <span>{ direction==='asc' && <SortUp className={styles.sortIcon} /> }</span>
              <span>{ direction==='desc' && <SortDown className={styles.sortIcon} /> }</span>
            </Fragment>
          }
      </th>
      <th onClick={handleClickColumnCreator('email', field === 'email' ? inverted[direction] : 'desc')} className={styles.pointer} >
        <span>Email</span>
          {field === 'email' && 
            <Fragment>
              <span>{ direction==='asc' && <SortUp className={styles.sortIcon} /> }</span>
              <span>{ direction==='desc' && <SortDown className={styles.sortIcon} /> }</span>
            </Fragment>
          }
      </th>
      <th onClick={handleClickColumnCreator('city', field === 'city' ? inverted[direction] : 'desc')} className={styles.pointer} >
        <span>Город</span>
          {field === 'city' && 
            <Fragment>
              <span>{ direction==='asc' && <SortUp className={styles.sortIcon} /> }</span>
              <span>{ direction==='desc' && <SortDown className={styles.sortIcon} /> }</span>
            </Fragment>
          }
      </th>
      <th onClick={handleClickColumnCreator('street', field === 'street' ? inverted[direction] : 'desc')} className={styles.pointer} >
        <span>Улица</span>
          {field === 'street' && 
            <Fragment>
              <span>{ direction==='asc' && <SortUp className={styles.sortIcon} /> }</span>
              <span>{ direction==='desc' && <SortDown className={styles.sortIcon} /> }</span>
            </Fragment>
          }
      </th>
    </tr>
  </thead>
)

export default TableHeader