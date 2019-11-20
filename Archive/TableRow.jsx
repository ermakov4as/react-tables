import React from 'react';
/* import { Button } from 'reactstrap'; */

/* <td><Button color="success">Hello world</Button></td> */
export const TableRow = ({user: {name, username, email}}) => (
  <tr>
    <td>{name}</td>
    <td>{username}</td>
    <td>{email}</td>
  </tr>
)

export default TableRow;