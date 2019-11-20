import React, { Component } from 'react';
import { 
  Row, Col, Button, Label, FormGroup,
  InputGroup, InputGroupAddon, Input, InputGroupButtonDropdown, InputGroupText,
  DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';

import styles from '../UsersTable.module.css';
import { userParamsNames } from '../../../common/services/mock';

class UserFilter extends Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      dropdownOpen: false,
      mails: [
        '',
        '@gmail.com',
        '@yandex.ru',
        '@hotmail.com',
        '@mail.ru',
        '@rambler.ru'
      ]
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
      handleClickClearMailFilter,
      searchingInput,
      filterMail,
      fromMoscow,
      handleInputSearchChange,
      handleClickSelectCategory,
      handleCheckboxFromMoscowChange,
      handleClickSelectMail
    } = this.props
    const { dropdownOpen, mails } = this.state
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
          <br />
          <FormGroup>
            <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Фильтр по почте: </InputGroupText>
            </InputGroupAddon>
              <Input type="select" name="select" value={filterMail} onChange={handleClickSelectMail}>
                {
                  mails.map((mail, index) => {
                    return (
                      <option key={index} value={index===0 ? '' : mail} disabled={index===0}>
                        { mail ? mail : 'Выберите почту' }
                      </option>
                    )
                  })
                }
              </Input>
              <InputGroupAddon addonType="append">
                <Button color="warning" onClick={handleClickClearMailFilter}>Очистить</Button>
              </InputGroupAddon>
            </InputGroup>
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