import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from "classnames";

import { ReactComponent as SortDown } from 'common/assets/sort-down.svg';

import { setFilters } from 'modules/UsersTable/actions/filters';
import { getFilters } from 'modules/UsersTable/selectors/filters';
import { userParamsMapping } from 'modules/UsersTable/constants/usersTable';

import styles from './TableHeader.module.css';

const inverted = {
  asc: 'desc',
  desc: 'asc'
};

const iconsMapping = {
  'asc': styles.sortIconUp,
  'desc': styles.sortIconDown
}

const TableHeader = () => {
  const dispatch = useDispatch();
  const { field, direction } = useSelector(state => getFilters(state));

  const sortData = (field, direction) => () => {
    dispatch(setFilters({ direction, field }));
  };

  const columnSmClass = cx(styles.thUsers, styles.tableColumnSm);
    
  return (
    <thead className={styles.theadUsers}>
      <tr className={styles.trUsers}>
        <th className={columnSmClass}>#</th>
        {
          Object.keys(userParamsMapping).map(name => {
            const columnClass = cx({
              [styles.pointer]: true,
              [styles.thUsers]: true,
              [styles.tableColumnL]: name === "email"
            })
            return (
              <th
                onClick={sortData(name, field === name ? inverted[direction] : 'desc')}
                className={columnClass}
                key={name}
              >
                <span>{userParamsMapping[name]}</span>
                {field === name && (
                  <span><SortDown className={iconsMapping[direction]} /></span>
                )}
              </th>
            )
          })
        }
      </tr>
    </thead>
  );
};

export default TableHeader;