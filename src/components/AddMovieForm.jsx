// AddMovieForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "../assets/AddMovieStyle.css";
import { auth } from "../Firebase/firebaseConfig";
import { signOut } from "firebase/auth";

// Función asíncrona para buscar el póster usando TMDb
async function fetchMoviePoster(query) {
  const apiKey = "a710171045e7640b21b81ab5e0b26378"; // Reemplaza con tu API key de TMDb
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;
    if (results && results.length > 0) {
      const movie = results[0];
      if (movie.poster_path) {
        return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      }
    }
    return `https://via.placeholder.com/800x400?text=${encodeURIComponent(
      query
    )}`;
  } catch (error) {
    console.error("Error al obtener el póster:", error);
    return `https://via.placeholder.com/800x400?text=${encodeURIComponent(
      query
    )}`;
  }
}

function AddMovieForm({ addMovie }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aiName, setAiName] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [comment, setComment] = useState("");
  const [technology, setTechnology] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !aiName) {
      alert("El título de la película y el nombre de la IA son obligatorios.");
      return;
    }
    // Busca el póster utilizando TMDb y axios
    const cover = await fetchMoviePoster(title);

    // Obtener datos del usuario autenticado
    const user = auth.currentUser;

    const newMovie = {
      title,
      description,
      cover,
      aiElements: [
        {
          name: aiName,
          moments: {
            inicio,
            fin,
          },
          comment,
          technology,
        },
      ],
      // Agregar información del publicador si el usuario está autenticado
      publisher: user
        ? {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }
        : null,
    };

    await addMovie(newMovie);

    // Limpiar formulario
    setTitle("");
    setDescription("");
    setAiName("");
    setInicio("");
    setFin("");
    setComment("");
    setTechnology("");

    // Cerrar sesión del usuario después de publicar la película
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Agregar nueva película</h2>
      <div>
        <label>Título: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción: </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Nombre de la IA: </label>
        <input
          type="text"
          value={aiName}
          onChange={(e) => setAiName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Momento de inicio: </label>
        <input
          type="text"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
        />
      </div>
      <div>
        <label>Momento de fin: </label>
        <input
          type="text"
          value={fin}
          onChange={(e) => setFin(e.target.value)}
        />
      </div>
      <div>
        <label>Comentario: </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div>
        <label>Tecnología aplicada: </label>
        <input
          type="text"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        />
      </div>
      <button type="submit">Agregar Película</button>
    </form>
  );
}

export default AddMovieForm;
