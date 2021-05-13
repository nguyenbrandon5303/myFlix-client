import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds root of app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);