import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`https://myflixdb-5303.herokuapp.com/users/${username}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(e => {
        console.log('error updating the user');
        console.log(e);
      });
  };
  const handleDeregister = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('user');
    axios.delete(`https://myflixdb-5303.herokuapp.com/users/${storedUsername}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      .catch(e => {
        console.log('error deleting the user');
        console.log(e);
      });
  }

  favoriteMoviesId = [];
  favoriteMoviesList = [];

  const token = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('user');

  const setMovieList = (e) => {
    axios.get(`https://myflixdb-5303.herokuapp.com/users/${storedUsername}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        favoriteMoviesId = response.data.Favorite;
        console.log(favoriteMoviesId);
      })
      .catch(e => {
        console.log('error getting favorite movies')
        console.log(e);
      })
  }

  const getMovies = (e) => {
    axios.get('https://myflixdb-5303.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        movies: response.data
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  setMovieList();
  console.log(favoriteMoviesId);

  // movieDB = getMovies();
  // favoriteMoviesId.forEach(movieid => favoriteMoviesList.push(movieDB.find(m => m._id === match.params.movieId)));
  // console.log(favoriteMoviesId);
  // console.log(favoriteMoviesList);

  return (
    <div>
      <form>
        <label>
          Username:
        <input type="text" value={username} placeholder="Username" required onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
        <input type="text" value={password} placeholder="Password" required onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          Email:
        <input type="email" value={email} placeholder="Email" required onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Date of birth:
        <input type="date" value={birthday} placeholder="Date of Birth" required onChange={e => setBirthday(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Update</button>
        <button type="submit" onClick={handleDeregister}>Deregister</button>
      </form>
      <Row >
        {favoriteMoviesList.map((movie) => {
          return (
            <Card>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link">Open</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })
        }
      </Row>
    </div>
  );
}
