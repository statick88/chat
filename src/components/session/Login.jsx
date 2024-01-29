import React, { useState } from "react";
import { signIn, signInWithGithub } from "../../api/ApiUser"; // Asegúrate de que la ruta sea correcta

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      console.log("Usuario logueado:", user);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
      setError(error.message);
    }
  };

  const handleLoginWithGithub = async () => {
    try {
      const { user, session } = await signInWithGithub();
      console.log("Usuario logueado con GitHub:", user, session);
    } catch (error) {
      console.error("Error en el inicio de sesión con GitHub:", error.message);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="button" onClick={handleLoginWithGithub}>
        Iniciar sesión con GitHub
      </button>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginComponent;
