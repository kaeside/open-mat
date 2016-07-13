import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

class Main extends Component {
  render() {
    return <h1>I work!</h1>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>
    , document.querySelector('.app'));
});
