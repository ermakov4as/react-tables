import React, { Component } from 'react';
import { 
  Row, Col, Button, Label, FormGroup,
  InputGroup, InputGroupAddon, Input, InputGroupButtonDropdown, 
  DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';

import styles from './UsersTable.module.css';
import { userParamsNames } from '../../services/mock';

class UserFilter extends Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }

  toggleDropdown() {
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  }

  render() {
    const { 
      searchCategory: { title: categoryTitle }, 
      dataLoaded, 
      isLoading, 
      loadError,
      removeUserData,
      updateUserData,
      handleClickClearSearching,
      searchingInput,
      fromMoscow, // TODO:
      handleInputSearchChange,
      handleClickSelectCategory,
      handleCheckboxFromMoscowChange // TODO:
    } = this.props
    const { dropdownOpen } = this.state
    return (
      <Row className={styles.headerRow}>
        <Col sm="7">
          <InputGroup className={styles.paddingSM}>
            <InputGroupButtonDropdown addonType="prepend" isOpen={dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>{ categoryTitle }</DropdownToggle>
              <DropdownMenu>
                {
                  userParamsNames.map(({ name, title }) => {
                    return (
                      <DropdownItem key={name} onClick={handleClickSelectCategory(name)}>{title}</DropdownItem>
                    )}
                  )
                }
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input
              name="searchByServer" 
              type="text" 
              value={searchingInput} 
              onChange={handleInputSearchChange} 
              placeholder="Введите для поиска" 
            />
            <InputGroupAddon addonType="append">
              <Button color="warning" onClick={handleClickClearSearching}>Очистить</Button>
            </InputGroupAddon>
          </InputGroup>
          <FormGroup check>
            <Label check>
              <Input 
                type="checkbox"
                checked={fromMoscow}
                onChange={handleCheckboxFromMoscowChange} 
              />{' '}
              Только из Москвы
            </Label>
          </FormGroup>
        </Col>
        <Col sm="5" className={styles.uploadBtn}>
          {dataLoaded && !isLoading &&
            <Button color="danger" onClick={removeUserData}>Очистить таблицу</Button>
          }
          {!dataLoaded && isLoading &&
            <Button outline color="warning" disabled>Загрузка . . .</Button>
          }
          {!dataLoaded && !isLoading &&
            <Button outline color="info" onClick={updateUserData}>Загрузить данные</Button>
          }
          {loadError &&
            <p className={styles.redText}>Ошибка загрузки :(</p>
          }
        </Col>
      </Row>
    )
  }
}

export default UserFilter