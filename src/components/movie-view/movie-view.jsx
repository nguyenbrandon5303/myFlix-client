import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  addToFavorite(movieId) {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('user');
    console.log(token);

    axios.post(`https://myflixdb-5303.herokuapp.com/users/${storedUsername}/movies/${movieId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response.data.Favorite);
      })
      .catch(function (error) {
        console.log('error adding to favorite');
        console.log(error);
      })

  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <button onClick={() => { this.addToFavorite(movie._id); }}>Add to Favorites</button>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}