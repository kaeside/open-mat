import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchBar from './components/search_bar';

class Main extends Component {
  render() {
    return <div className="page">
              <section className="search-bar">
                <SearchBar />
              </section>
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
