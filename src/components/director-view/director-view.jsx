import React from 'react';
import Container from 'react-bootstrap/Container';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <div className="director-view">
          <div className="director-name">
            <span className="label">Name: </span>
            <span className="value">{director.Name}</span>
          </div>
          <div className="director-bio">
            <span className="label">Bio: </span>
            <span className="value">{director.Bio}</span>
          </div>
          <div className="director-birthday">
            <span className="label">Birthday: </span>
            <span className="value">{director.Birth}</span>
          </div>
          <button onClick={() => { onBackClick(null); }}>Back</button>
        </div>
      </Container>
    );
  }
}