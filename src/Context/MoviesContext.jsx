import { useState, useEffect } from "react";
import initialMovies from "../data/movies.json";
import { MoviesContext } from "./MoviesContext";

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    const localData = localStorage.getItem("movies");
    return localData ? JSON.parse(localData) : initialMovies;
  });

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = (newMovie) => {
    setMovies([...movies, { ...newMovie, id: Date.now() }]);
  };

  const rateMovie = (movieId, rating) => {
    setMovies(
      movies.map((movie) =>
        movie.id === movieId
          ? { ...movie, ratings: [...movie.ratings, rating] }
          : movie
      )
    );
  };

  const handleReaction = (movieId, type) => {
    setMovies(
      movies.map((movie) =>
        movie.id === movieId ? { ...movie, [type]: movie[type] + 1 } : movie
      )
    );
  };

  return (
    <MoviesContext.Provider
      value={{ movies, addMovie, rateMovie, handleReaction }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
