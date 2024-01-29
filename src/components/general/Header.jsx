import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado para usar Link

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MiAplicación</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Iniciar Sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registrarse</Link>
            </li>
            {/* Puedes agregar más enlaces de navegación aquí según sea necesario */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
