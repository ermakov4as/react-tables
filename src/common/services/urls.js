/* export const BASE_URL = 'https://drag06.ru/api'; */
export const BASE_URL = 'http://localhost:8087';

export const GET_USERS = '/users';
export function GET_USER_TODOS(id) { return `/users/${id}/todos` };