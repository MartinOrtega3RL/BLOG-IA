import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import initialMovies from "./Data/movies.json";
import "./App.css";

import { db } from "./Firebase/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

function App() {
  const [movies, setMovies] = useState([]);

  // Escuchar cambios en la colección "movies" en tiempo real
  useEffect(() => {
    const moviesCollection = collection(db, "movies");
    const q = query(moviesCollection, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moviesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(moviesData);
    });

    return () => unsubscribe();
  }, []);

  // Función para agregar película a Firestore
  const addMovie = async (movie) => {
    try {
      const moviesCollection = collection(db, "movies");
      await addDoc(moviesCollection, {
        ...movie,
        ratings: { likes: 0, dislikes: 0 },
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error al agregar la película:", error);
    }
  };

  // Función para actualizar la valoración de una película
  const updateRating = async (id, type) => {
    try {
      const movieRef = doc(db, "movies", id);
      const fieldToUpdate =
        type === "like" ? "ratings.likes" : "ratings.dislikes";
      await updateDoc(movieRef, {
        [fieldToUpdate]: increment(1),
      });
    } catch (error) {
      console.error("Error al actualizar la valoración:", error);
    }
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
