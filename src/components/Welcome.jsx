import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="container text-center">
      <div>
        <img
          src="../src/assets/react.svg"
          alt=""
          className="mx-auto d-block m-5"
          style={{ width: "10rem" }}
        />
      </div>
      <h3 className="mt-5 fw-bold">Gestor de Vida y Ministerio Cristiano</h3>
      <nav className="mt-4">
        <ul className="list-unstyled ">
          <li>
            <Link className="text-decoration-none" to="/brother-manager">Crear y editar Hermanos</Link>
          </li>
          <li>
            <Link className="text-decoration-none" to="/brother-list">Listado de Hermanos</Link>
          </li>
          <li>
            <Link className="text-decoration-none" to="/meeting-schedule">Programa de Reuniones</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Welcome;

