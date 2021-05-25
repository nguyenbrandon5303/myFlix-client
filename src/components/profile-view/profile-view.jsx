import React, { useState, useEffect } from 'react';
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
  const [favoriteMovieIds, setFavoriteMoviesIds] = useState('');
  const [favoriteMoviesList, setFavoriteMoviesList] = useState('');

  useEffect(async () => {
    await setMovieList();
    await getMovies();
  }, []);

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

  const token = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('user');

  const setMovieList = () => {
    axios.get(`https://myflixdb-5303.herokuapp.com/users/${storedUsername}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setFavoriteMoviesIds(response.data.Favorite);
        console.log('favoriteMovieIds: ' + favoriteMovieIds);
      })
      .catch(e => {
        console.log('error getting favorite movie id')
        console.log(e);
      })
  }

  const getMovies = () => {
    axios.get('https://myflixdb-5303.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const favMovies = response.data.filter((movie) => favoriteMovieIds.includes(movie._id));
        setFavoriteMoviesList(favMovies);
        console.log(favoriteMoviesList);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const removeFavorite = (movieId) => {
    console.log(movieId);
    // Returns index of the movie based on movie._id
    pos = favoriteMoviesList.findIndex((element) => element._id === movieId);
    console.log(pos);
    // Remove the movie at position pos
    // favoriteMoviesList.splice(pos, 1);
  }

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
            <Col md={6} key={movie._id}>
              <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
                  <Button onClick={removeFavorite(movie._id)}>Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })
        }
      </Row>
    </div>
  );
}
