import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  Row, Col, Button, Label, FormGroup,
  InputGroup, InputGroupAddon, Input, InputGroupButtonDropdown, InputGroupText,
  DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';

import { ReactComponent as Delete } from 'common/assets/delete.svg';

import { userParamsNames, mails } from 'common/services/mock';

import { setUsers } from 'modules/UsersTable/actions/users';
import { setFilters, resetFilters } from 'modules/UsersTable/actions/filters';

import styles from '../UsersTable.module.css';
import { getUsers } from '../selectors/users';
import { getFilters } from '../selectors/filters';


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
    this.state = {
      dropdownOpen: false
    };
  };

  toggleDropdown() {
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  };

  handleCheckboxFromMoscowChange() {
    const { filters: { fromMoscow } } = this.props;
    this.props.setFilters({ fromMoscow: !fromMoscow });
  };

  handleClickSelectCategory(name) {
    return this.selectCategory.bind(this, name);
  };

  selectCategory(name) {
    const userData = userParamsNames.find(_userData => _userData.name === name);
    this.props.setFilters({ searchCategory: userData });
  };

  handleClickSelectMail({ target: { value: mail }}) {
    this.props.setFilters({ filterMail: mail });
  };

  handleClickClearMailFilter() {
    this.props.setFilters({ filterMail: '' });
  };

  handleInputSearchChange({ target: { value: userInput }}) {
    this.props.setFilters({ searchingInput: userInput });
  };

  handleClickResetFilters() {
    this.props.resetFilters();
  };

  render() {
    const {
      filters: { searchingInput, filterMail, fromMoscow, searchCategory: { title: categoryTitle } },
      dataLoaded, 
      isLoading, 
      loadError,
      removeUserData,
      updateUserData
    } = this.props;
    const { dropdownOpen } = this.state;
    return (
      <Row className={styles.headerRow}>
        <Col sm="4">
          <InputGroup className={styles.paddingSM}>
            <InputGroupButtonDropdown addonType="prepend" isOpen={dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>{ categoryTitle }</DropdownToggle>
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
              {' '}
              Только из Москвы
            </Label>
          </FormGroup>
        </Col>
        <Col sm="4">
          <InputGroup className={styles.paddingSM}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Фильтр по почте: </InputGroupText>
            </InputGroupAddon>
            <Input type="select" name="select" value={filterMail} onChange={this.handleClickSelectMail}>
              {
                mails.map((mail, index) => {
                  return (
                    <option key={mail} value={index===0 ? '' : mail} disabled={index===0}>
                      { mail || 'Выберите почту' }
                    </option>
                  );
                })
              }
            </Input>
            {filterMail && (
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <Delete className={styles.deleteIcon} onClick={this.handleClickClearMailFilter} />
                </InputGroupText>
              </InputGroupAddon>
            )}
          </InputGroup>
        </Col>
        <Col sm="4" className={styles.uploadBtn}>
          {dataLoaded && !isLoading && (
            <>
              <Button color="danger" onClick={removeUserData}>Очистить таблицу</Button>
              <br />
              <br />
              <Button color="outline-danger" onClick={this.handleClickResetFilters}>Сбросить фильтры</Button>
            </>
          )}
          {!dataLoaded && isLoading &&
            <Button outline color="warning" disabled>Загрузка . . .</Button>}
          {!dataLoaded && !isLoading &&
            <Button outline color="info" onClick={updateUserData}>Загрузить данные</Button>}
          {loadError &&
            <p className={styles.redText}>Ошибка загрузки :(</p>}
        </Col>
      </Row>
    );
  };
};

const mapStateToProps = state => ({
  users: getUsers(state),
  filters: getFilters(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setUsers,
    setFilters,
    resetFilters
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserFilter);