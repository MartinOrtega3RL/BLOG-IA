import React from "react";
import json from "../Data/movies.json";
import MovieItem from "./MovieItem";
import "../assets/MovieItemStyle.css";

function MovieList({ movies, updateRating }) {
  console.log(json);
  return (
    <div>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} updateRating={updateRating} />
      ))}
    </div>
  );
}

export default MovieList;
