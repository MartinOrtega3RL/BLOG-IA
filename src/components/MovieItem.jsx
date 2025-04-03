// MovieItem.jsx
import React, { useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../Firebase/firebaseConfig.js";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaClock,
  FaCogs,
  FaCommentAlt,
} from "react-icons/fa";
import "../assets/MovieItemStyle.css";

function MovieItem({ movie, updateRating }) {
  const [newComment, setNewComment] = useState("");

  const coverUrl =
    movie.cover ||
    `https://via.placeholder.com/800x400?text=${encodeURIComponent(
      movie.title
    )}`;

  // Función para agregar un comentario (usuarios que no son el autor)

  const handleAddComment = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }
    if (!newComment.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    const commentData = {
      text: newComment,
      user: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      createdAt: new Date(), // Usamos la marca de tiempo del cliente en lugar de serverTimestamp()
    };

    try {
      const movieRef = doc(db, "movies", movie.id);
      await updateDoc(movieRef, {
        comments: arrayUnion(commentData),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    }
  };

  return (
    <div className="movie-card">
      <img
        src={coverUrl}
        alt={`${movie.title} cover`}
        className="cover-image"
      />
      <h2>{movie.title}</h2>
      <p className="movie-description">{movie.description}</p>

      {/* Mostrar información de los elementos de IA sin el comentario */}
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

      {/* Información del publicador */}
      {movie.publisher && (
        <div className="publisher-info">
          <img
            src={movie.publisher.photoURL}
            alt={movie.publisher.displayName}
          />
          <span>Publicado por: {movie.publisher.displayName}</span>
        </div>
      )}

      {/* Sección única de comentarios */}
      <div className="comments-section">
        <h3>Comentarios</h3>

        {/* Comentario del Autor (extraído del primer aiElement, si existe) */}
        {movie.aiElements.length > 0 && movie.aiElements[0].comment && (
          <div className="comment-item author-comment">
            <div className="comment-user">
              {movie.publisher ? (
                <img
                  src={movie.publisher.photoURL}
                  alt={movie.publisher.displayName}
                />
              ) : (
                <img src="https://via.placeholder.com/30" alt="Autor" />
              )}
              <span>
                {movie.publisher
                  ? `${movie.publisher.displayName} (Autor)`
                  : "Autor"}
              </span>
            </div>
            <p className="comment-text">{movie.aiElements[0].comment}</p>
          </div>
        )}

        {/* Comentarios de otros usuarios */}
        {movie.comments && movie.comments.length > 0 ? (
          <ul className="comments-list">
            {movie.comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <div className="comment-user">
                  <img
                    src={comment.user.photoURL}
                    alt={comment.user.displayName}
                  />
                  <span>{comment.user.displayName}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-comments">Aún no hay comentarios.</p>
        )}

        {/* Formulario para agregar un comentario */}
        <form onSubmit={handleAddComment} className="comment-form">
          <input
            type="text"
            placeholder="Agrega un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">
            <FaCommentAlt /> Comentar
          </button>
        </form>
      </div>
    </div>
  );
}

export default MovieItem;
