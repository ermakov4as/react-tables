import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { userParamsMapping, mails } from 'modules/UsersTable/constants/usersTable';
import styles from './UserFilter.module.css';


const UserFilter = ({ updateUserData }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => getIsFetching(state)[FETCH_USERS]);
  const dataLoaded = useSelector(state => getIsFetched(state)[FETCH_USERS]);
  const fetchError = useSelector(state => getIsUsersFetchError(state));
  const filters = useSelector(state => getFilters(state));
  const filtersAreChanged = useSelector(state => getAreFiltersChanged(state));

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { searchingInput, filterMail, fromMoscow, searchField } = filters;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCheckboxFromMoscowChange = () => {
    dispatch(setFilters({ fromMoscow: !fromMoscow }));
  };

  const handleClickSelectCategory = (filterSearchField) => () => {
    dispatch(setFilters({ searchField: filterSearchField }));
  };

  const handleClickSelectMail = ({ target: { value: filterFilterMail }}) => {
    dispatch(setFilters({ filterMail: filterFilterMail }));
  };

  const handleInputSearchChange = ({ target: { value: filterSearchingInput } }) => {
    dispatch(setFilters({ searchingInput: filterSearchingInput }));
  };

  const handleClickResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleClickRemoveUserData = () => {
    dispatch(resetUsers());
  };
    
  return (
    <Row className={styles.headerRow}>
      <Col sm="4">
        <InputGroup className={styles.paddingSm}>
          <InputGroupButtonDropdown addonType="prepend" isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>{ userParamsMapping[searchField] }</DropdownToggle>
            <DropdownMenu>
              {
                Object.keys(userParamsMapping).map(name => (
                  <DropdownItem key={name} onClick={handleClickSelectCategory(name)}>
                    {userParamsMapping[name]}
                  </DropdownItem>
                ))
              }
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input
            name="searchByServer" 
            type="search" 
            value={searchingInput} 
            onChange={handleInputSearchChange} 
            placeholder="Введите для поиска" 
          />
          <InputGroupAddon addonType="append">
            <Button color="secondary" onClick={updateUserData}>Поиск</Button>
          </InputGroupAddon>
        </InputGroup>
        <FormGroup check>
          <Label check>
            <Input 
              type="checkbox"
              checked={fromMoscow}
              onChange={handleCheckboxFromMoscowChange} 
            />
            Только из Москвы
          </Label>
        </FormGroup>
      </Col>
      <Col sm="1" />
      <Col sm="3">
        <InputGroup className={styles.paddingSm}>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Фильтр по почте: </InputGroupText>
          </InputGroupAddon>
          <Input type="select" name="select" value={filterMail} onChange={handleClickSelectMail}>
            <option value=''>Почта не выбрана</option>
            {
              mails.map((mail) => (
                <option key={mail} value={mail}>
                  { mail }
                </option>
              ))
            }
          </Input>
        </InputGroup>
      </Col>
      <Col sm="2" className={styles.uploadBtn}>
        {!filtersAreChanged &&
          <Button color="outline-danger" onClick={handleClickResetFilters}>Сбросить фильтры</Button>}
      </Col>
      <Col sm="2" className={styles.uploadBtn}>
        {(!dataLoaded && !isFetching)
          ?
          <Button outline color="info" onClick={updateUserData}>Загрузить данные</Button>
          :
          <Button color="danger" onClick={handleClickRemoveUserData}>Очистить таблицу</Button>}
        {fetchError &&
          <p className={styles.redText}>Ошибка загрузки :(</p>}
      </Col>
    </Row>
  );
};

export default UserFilter;