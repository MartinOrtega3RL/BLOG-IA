// Login.jsx
import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase/firebaseConfig"; // Asegúrate de que la ruta sea correcta
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import "../assets/LoginStyle.css";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Escucha en tiempo real los cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged actualizará el estado automáticamente
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      {user ? (
        <div className="user-info">
          <img src={user.photoURL} alt={user.displayName} />
          <span>{user.displayName}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
      )}
    </div>
  );
};

export default Login;
