import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  Row, Col, Button, Label, FormGroup,
  InputGroup, InputGroupAddon, Input, InputGroupButtonDropdown, InputGroupText,
  DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';


import { resetUsers } from 'modules/UsersTable/actions/users';
import { setFilters, resetFilters } from 'modules/UsersTable/actions/filters';
import { getIsUsersFetchError } from 'modules/UsersTable/selectors/users';
import { getFilters, getAreFiltersChanged } from 'modules/UsersTable/selectors/filters';
import { getIsFetching, getIsFetched } from 'common/selectors/fetcher';

import { FETCH_USERS } from 'common/constants/actionTypes';
import styles from './UserFilter.module.css';
import { userParamsNames, mails } from './constants/tableComponents';


class UserFilter extends Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleCheckboxFromMoscowChange = this.handleCheckboxFromMoscowChange.bind(this);
    this.handleClickSelectCategory = this.handleClickSelectCategory.bind(this);
    this.handleClickSelectMail = this.handleClickSelectMail.bind(this);
    this.handleClickClearMailFilter = this.handleClickClearMailFilter.bind(this);
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this);
    this.handleClickResetFilters = this.handleClickResetFilters.bind(this);
    this.handleClickRemoveUserData = this.handleClickRemoveUserData.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  };

  getTitle(searchField) { // TODO: ESLint -> Expected 'this' to be used by class method 'getTitle'.
    const userData = userParamsNames.find(currentUserData => currentUserData.name === searchField);
    const { title } = userData;
    return title;
  };

  toggleDropdown() {
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  };

  handleCheckboxFromMoscowChange() {
    const { filters: { fromMoscow } } = this.props;
    this.props.setFilters({ fromMoscow: !fromMoscow });
  };

  handleClickSelectCategory(searchField) {
    return this.selectCategory.bind(this, searchField); // TODO: когда нужна двухэтапность?
  };

  selectCategory(searchField) {
    this.props.setFilters({ searchField });
  };

  handleClickSelectMail({ target: { value: filterMail }}) {
    this.props.setFilters({ filterMail });
  };

  handleClickClearMailFilter() {
    this.props.setFilters({ filterMail: '' });
  };

  handleInputSearchChange({ target: { value: searchingInput }}) {
    this.props.setFilters({ searchingInput });
  };

  handleClickResetFilters() {
    this.props.resetFilters();
  };

  handleClickRemoveUserData() {
    this.props.resetUsers();
  };

  render() {
    const {
      filters: { searchingInput, filterMail, fromMoscow, searchField }, 
      isFetching,
      fetchError,
      dataLoaded,
      filtersAreChanged,
      updateUserData
    } = this.props;
    const { dropdownOpen } = this.state;
    return (
      <Row className={styles.headerRow}>
        <Col sm="4">
          <InputGroup className={styles.paddingSm}>
            <InputGroupButtonDropdown addonType="prepend" isOpen={dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>{ this.getTitle(searchField) }</DropdownToggle>
              <DropdownMenu>
                {
                  userParamsNames.map(({ name, title }) => {
                    return (
                      <DropdownItem key={name} onClick={this.handleClickSelectCategory(name)}>{title}</DropdownItem>
                    )}
                  )
                }
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input
              name="searchByServer" 
              type="search" 
              value={searchingInput} 
              onChange={this.handleInputSearchChange} 
              placeholder="Введите для поиска" 
            />
          </InputGroup>
          <FormGroup check>
            <Label check>
              <Input 
                type="checkbox"
                checked={fromMoscow}
                onChange={this.handleCheckboxFromMoscowChange} 
              />
              Только из Москвы
            </Label>
          </FormGroup>
        </Col>
        <Col sm="4">
          <InputGroup className={styles.paddingSm}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Фильтр по почте: </InputGroupText>
            </InputGroupAddon>
            <Input type="select" name="select" value={filterMail} onChange={this.handleClickSelectMail}>
              <option value=''>Почта не выбрана</option>
              {
                mails.map((mail) => {
                  return (
                    <option key={mail} value={mail}>
                      { mail }
                    </option>
                  );
                })
              }
            </Input>
          </InputGroup>
        </Col>
        <Col sm="2" className={styles.uploadBtn}>
          {!filtersAreChanged &&
            <Button color="outline-danger" onClick={this.handleClickResetFilters}>Сбросить фильтры</Button>}
        </Col>
        <Col sm="2" className={styles.uploadBtn}>
          {dataLoaded && !isFetching &&
            <Button color="danger" onClick={this.handleClickRemoveUserData}>Очистить таблицу</Button>}
          {isFetching &&
            <Button outline color="warning" disabled>Загрузка . . .</Button>}
          {!dataLoaded && !isFetching &&
            <Button outline color="info" onClick={updateUserData}>Загрузить данные</Button>}
          {fetchError &&
            <p className={styles.redText}>Ошибка загрузки :(</p>}
        </Col>
      </Row>
    );
  };
};

const mapStateToProps = state => ({
  isFetching: getIsFetching(state)[FETCH_USERS],
  dataLoaded: getIsFetched(state)[FETCH_USERS],
  fetchError: getIsUsersFetchError(state),
  filters: getFilters(state),
  filtersAreChanged: getAreFiltersChanged(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    resetUsers,
    setFilters,
    resetFilters
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserFilter);