// MovieItem.jsx
import React from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaClock,
  FaCommentAlt,
  FaCogs,
} from "react-icons/fa";
import "../assets/MovieItemStyle.css";

function MovieItem({ movie, updateRating }) {
  const coverUrl =
    movie.cover ||
    `https://via.placeholder.com/800x400?text=${encodeURIComponent(
      movie.title
    )}`;

  return (
    <div className="movie-card">
      <img
        src={coverUrl}
        alt={`${movie.title} cover`}
        className="cover-image"
      />
      <h2>{movie.title}</h2>
      <p className="movie-description">{movie.description}</p>

      {movie.aiElements.map((ai, index) => (
        <div key={index} className="ai-element">
          <h3>Nombre: {ai.name}</h3>
          <p>
            <FaClock /> <strong>Inicio:</strong> {ai.moments.inicio}
          </p>
          <p>
            <FaClock /> <strong>Fin:</strong> {ai.moments.fin}
          </p>
          <p>
            <FaCommentAlt /> <strong>Comentario:</strong> {ai.comment}
          </p>
          <p>
            <FaCogs /> <strong>Tecnología aplicada:</strong> {ai.technology}
          </p>
        </div>
      ))}

      <div className="rating-buttons">
        <button onClick={() => updateRating(movie.id, "like")}>
          <FaThumbsUp /> Me gusta
        </button>
        <button onClick={() => updateRating(movie.id, "dislike")}>
          <FaThumbsDown /> No me gusta
        </button>
      </div>
      <p style={{ textAlign: "center" }}>
        Likes: {movie.ratings.likes} | No me gusta: {movie.ratings.dislikes}
      </p>
      {/* Mostrar información del publicador si existe */}
      {movie.publisher && (
        <div
          className="publisher-info"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          <img
            src={movie.publisher.photoURL}
            alt={movie.publisher.displayName}
            style={{ width: "30px", borderRadius: "50%", marginRight: "5px" }}
          />
          <span>Publicado por: {movie.publisher.displayName}</span>
        </div>
      )}
    </div>
  );
}

export default MovieItem;
