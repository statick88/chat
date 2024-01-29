import React, { useState } from "react";
import { signUp, signUpWithGithub } from "../../api/ApiUser";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(email, password);
      console.log("Usuario registrado:", user);
    } catch (error) {
      console.error("Error en el registro:", error.message);
      setError(error.message);
    }
  };

  const handleRegisterWithGithub = async () => {
    try {
      const { user, session } = await signUpWithGithub();
      console.log("Usuario registrado con GitHub:", user, session);
    } catch (error) {
      console.error("Error en el registro con GitHub:", error.message);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
      <button type="button" onClick={handleRegisterWithGithub}>Registrarse con github</button>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegisterComponent;
