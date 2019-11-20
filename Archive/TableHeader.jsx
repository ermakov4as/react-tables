import React from 'react';
import { ReactComponent as SortUp } from '../../assets/sort-up.svg';
import { ReactComponent as SortDown } from '../../assets/sort-down.svg';
import styles from './UsersTable.module.css'
/* import { Button } from 'reactstrap'; */

/* <td><Button color="success">Hello world</Button></td> */
export const TableHeader = ({title, sortingUp, sortingDown, onClick}) => (
  <th onClick={onClick} className={styles.pointer} >
    <span>{title} </span>
    <span>{ sortingUp && <SortUp className={styles.sortIcon} /> }</span>
    <span>{ sortingDown && <SortDown className={styles.sortIcon} /> }</span>
  </th>
)