import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList}) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {
    push(`/update-movie/${id}`)
  }

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovieList(movieList.filter((movie) => {
          if(movie.id !== res.data) {
            return movie
          } else {
            return null
          }
        }))
        push('/')
      })
      .catch((err) => {
        alert(`${err.message}`)
      })
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
      <div className="save-wrapper">
        <MovieCard movie={movie} />

        <div className="save-button" onClick={saveMovie}>
          Save
        </div>
        <button onClick={updateMovie}>
          Update
        </button>
        <button onClick={deleteMovie}>
          Delete
        </button>
      </div>
  );
}

export default Movie;
