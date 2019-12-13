import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
            Object.keys(userParamsMapping).map(name => (
              <th 
                onClick={this.handleClickColumnCreator(name, field===name ? inverted[direction] : 'desc')}
                className={styles.pointer}
                key={name}
              >
                <span>{ userParamsMapping[name] }</span>
                  {field===name && (
                    <span><SortDown className={iconsMapping[direction]} /></span>
                  )}
              </th>
            ))
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