import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

// Finds root of app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);