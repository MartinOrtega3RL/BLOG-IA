import React, { useState } from "react";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import initialMovies from "./Data/movies.json";
import "./App.css";

function App() {
  const [movies, setMovies] = useState(initialMovies);

  console.log(movies);

  const addMovie = (movie) => {
    setMovies([
      ...movies,
      {
        ...movie,
        id: movies.length + 1,
        ratings: { likes: 0, dislikes: 0 },
      },
    ]);
  };

  const updateRating = (id, type) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        if (type === "like") {
          return {
            ...movie,
            ratings: { ...movie.ratings, likes: movie.ratings.likes + 1 },
          };
        } else {
          return {
            ...movie,
            ratings: { ...movie.ratings, dislikes: movie.ratings.dislikes + 1 },
          };
        }
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  return (
    <div className="container">
      <h1>Blog de Películas de IA</h1>
      <AddMovieForm addMovie={addMovie} />
      <MovieList movies={movies} updateRating={updateRating} />
    </div>
  );
}
export default App;
