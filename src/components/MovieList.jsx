// MovieList.jsx
import React from "react";
import MovieItem from "./MovieItem";
import "../assets/MovieItemStyle.css";

function MovieList({ movies, updateRating }) {
  return (
    <div>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} updateRating={updateRating} />
      ))}
    </div>
  );
}

export default MovieList;
