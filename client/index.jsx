import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchBar from './components/search_bar';
import Map from './components/map';
import pointer from './images/gym_pointer.svg';

import './sass/main.scss';

class Main extends Component {
  render() {
    return <div className="page">
              <section className="heading">
                <h1>Open</h1>
                <img src={pointer} alt="pointer image" />
                <h1>Mat</h1>
              </section>
              <section className="search-bar">
                <SearchBar />
              </section>
              <Map />
           </div>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>
    , document.querySelector('.app'));
});
