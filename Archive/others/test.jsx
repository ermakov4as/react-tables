import React, { Component, memo } from 'react';

class Test extends Component {
  handle1 = () => {
    console.log('Handler');
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    <div>
      <Button onClick={handle1} title="hello" />
      <Button onClick={handle1} title="hello1" />
      <Button onClick={handle1} title="hello2" />
    </div>
  }
}

const Button = memo(({ title, onClick }) => {
  return (
    <button onClick={() => onClick()) >{title}</button>
  )
}