import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ReactComponent as SortUp } from 'common/assets/sort-up.svg';
import { ReactComponent as SortDown } from 'common/assets/sort-down.svg';

import { userParamsNames } from 'common/services/mock';
import { setFilters } from 'modules/UsersTable/actions/filters';

import styles from 'modules/UsersTable/UsersTable.module.css';
import { getFilters } from 'modules/UsersTable/selectors/filters';

const inverted = {
  asc: 'desc',
  desc: 'asc'
};

class TableHeader extends Component {
  handleClickColumnCreator(field, direction) {
    return this.sortData.bind(this, field, direction);
  };

  sortData(field, direction) {
    this.props.setFilters({ direction, field });
  };
  
  render() {
    const { filters: { field, direction } } = this.props;
    return (
      <thead>
        <tr>
          <th>#</th>
          {
            userParamsNames.map(({ name, title }) => {
              return (
                <th 
                  onClick={this.handleClickColumnCreator(name, field===name ? inverted[direction] : 'desc')}
                  className={styles.pointer}
                  key={name}
                >
                  <span>{ title }</span>
                    {field===name && (
                      <>
                        <span>{ direction==='asc' ? <SortUp className={styles.sortIcon} /> : <SortDown className={styles.sortIcon} /> }</span>
                      </>
                    )}
                </th>
              );
            })
          }
        </tr>
      </thead>
    );
  };
};

const mapStateToProps = state => ({
  filters: getFilters(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setFilters,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);