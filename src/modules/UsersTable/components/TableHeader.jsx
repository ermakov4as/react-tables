import React, { Fragment } from 'react';
import { ReactComponent as SortUp } from '../../../common/assets/sort-up.svg';
import { ReactComponent as SortDown } from '../../../common/assets/sort-down.svg';

import styles from '../UsersTable.module.css';
import { userParamsNames } from '../../../common/services/mock';

const inverted = {
  asc: 'desc',
  desc: 'asc'
}

const TableHeader = ({ field, direction, handleClickColumnCreator }) => (
  <thead>
    <tr>
      <th>#</th>
      {
        userParamsNames.map(({ name, title }) => {
          return (
            <th 
              onClick={handleClickColumnCreator(name, field===name ? inverted[direction] : 'desc')} 
              className={styles.pointer} 
              key={name}  
            >
              <span>{ title }</span>
                {field===name && 
                  <Fragment>
                    <span>{ direction==='asc' && <SortUp className={styles.sortIcon} /> }</span>
                    <span>{ direction==='desc' && <SortDown className={styles.sortIcon} /> }</span>
                  </Fragment>
                }
            </th>
          )
        })
      }
    </tr>
  </thead>
)

export default TableHeader