import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../register-view/register-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      register: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://myflixdb-5303.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign result to state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            // If user is not logged in, LoginView will be rendered, otherwise user details are passed to LoginView
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }
          } />
          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
        </Row>
        <Route exact path="/genres/:name" render={({ match, history }) => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          </Col>

          if (movies.length === 0) return <div className="main-view" />;

          return <Col md={8}>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
          </Col>
        }
        } />
        <Route exact path="/directors/:name" render={({ match, history }) => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          </Col>

          if (movies.length === 0) return <div className="main-view" />;

          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
        }
        } />
        <Route exact path="/register" render={() => {
          if (user) return <Redirect to="/" />;
          return <Col>
            <RegistrationView />
          </Col>
        }
        } />
        <div>
          <button onClick={() => { this.onLoggedOut() }}>Logout</button>
        </div>
      </Router >
    );
  }
}