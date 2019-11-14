export const BASE_URL = 'https://drag06.ru/api'
export const GET_USERS = '/users'
export function GET_USER_TODOS(id) { return `/users/${id}/todos` }

/* export const BASE_URL = 'https://jsonplaceholder.typicode.com'
export const GET_USERS = '/users'
export const GET_USER_TODOS = '/todos/?userId=' */

/* 
+ https://drag06.ru/api
+ /users -> users
+ /users/:id/todos 
+ /users?field=name&direction=asc
+ debounce
+ /users?searchField=name&search=Ива 
+ multinames
*/
