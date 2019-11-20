import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const HomeInfo = () => (
  <Fragment>
    <h4>Тестовое SPA - ReactJS</h4>
    <Link to={'/users'}>Таблица пользователей</Link>
  </Fragment>
)

export default HomeInfo