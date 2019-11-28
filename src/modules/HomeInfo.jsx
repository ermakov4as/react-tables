import React from 'react';
import { Link } from 'react-router-dom';

const HomeInfo = () => (
  <>
    <h4>Тестовое SPA - ReactJS</h4>
    <Link to='/users'>Таблица пользователей</Link>
  </>
);

export default HomeInfo;