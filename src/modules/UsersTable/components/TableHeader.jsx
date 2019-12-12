import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ReactComponent as SortDown } from 'common/assets/sort-down.svg';

import { setFilters } from 'modules/UsersTable/actions/filters';
import { getFilters } from 'modules/UsersTable/selectors/filters';
import { userParamsNames } from './constants/tableComponents';

import styles from './TableHeader.module.css';

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
                      <span><SortDown className={direction==='asc' ? styles.sortIconUp : styles.sortIconDown} /></span>
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