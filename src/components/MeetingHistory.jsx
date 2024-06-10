import { useState, useEffect } from 'react';
import axios from 'axios';

const MeetingHistory = () => {
  const [reuniones, setReuniones] = useState([]);
  const [filtro, setFiltro] = useState({
    fecha: '',
    sala: '',
    asignacion: '',
    titular: '',
    ayudante: '',
    hermano: ''
  });

  useEffect(() => {
    fetchReuniones();
  }, []);

  const fetchReuniones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reuniones');
      console.log('Datos obtenidos del backend:', response.data);  // Añadir mensaje de depuración
      setReuniones(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de reuniones:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltro({ ...filtro, [name]: value });
  };

  const fechasUnicas = [...new Set(reuniones.map(reunion => reunion.Fecha))];
  const salasUnicas = [...new Set(reuniones.map(reunion => reunion.Sala))];
  const asignacionesUnicas = [...new Set(reuniones.map(reunion => reunion.Asignacion))];

  const filtrarReuniones = (reunion) => {
    const { fecha, sala, asignacion, titular, ayudante, hermano } = filtro;
    return (!fecha || reunion.Fecha === fecha) &&
           (!sala || reunion.Sala === sala) &&
           (!asignacion || reunion.Asignacion === asignacion) &&
           (!titular || reunion.Titular.toLowerCase().includes(titular.toLowerCase())) &&
           (!ayudante || reunion.Ayudante.toLowerCase().includes(ayudante.toLowerCase())) &&
           (!hermano || reunion.Titular.toLowerCase().includes(hermano.toLowerCase()) || reunion.Ayudante.toLowerCase().includes(hermano.toLowerCase()));
  };

  const detectarRepetidos = () => {
    const repetidos = {};
    reuniones.forEach(reunion => {
      const key = `${reunion.Fecha}-${reunion.Titular}`;
      if (repetidos[key]) {
        repetidos[key].count++;
      } else {
        repetidos[key] = { count: 1, reunion };
      }
    });
    return repetidos;
  };

  const repetidos = detectarRepetidos();

  console.log('Reuniones después de aplicar el filtro:', reuniones.filter(filtrarReuniones));

  return (
    <div className='container mb-4'>
      <h2 className='my-4 text-center fw-bold'>Historial de Reuniones</h2>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-4">
          <input type="text" name="hermano" value={filtro.hermano} onChange={handleChange} placeholder="Buscar Hermano/a" className="form-control mb-2" />
        </div>
        <div className="col-md-2">
          <select name="fecha" value={filtro.fecha} onChange={handleChange} className="form-select mb-2">
            <option value="">Seleccionar Fecha</option>
            {fechasUnicas.map((fecha, index) => (
              <option key={index} value={fecha}>{fecha}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select name="sala" value={filtro.sala} onChange={handleChange} className="form-select mb-2">
            <option value="">Seleccionar Sala</option>
            {salasUnicas.map((sala, index) => (
              <option key={index} value={sala}>{sala}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select name="asignacion" value={filtro.asignacion} onChange={handleChange} className="form-select mb-2">
            <option value="">Seleccionar Asignación</option>
            {asignacionesUnicas.map((asignacion, index) => (
              <option key={index} value={asignacion}>{asignacion}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='container'>
        <table className="table table-bordered table-hover">
          <thead className='table-secondary'>
            <tr className='text-center'>
              <th>Fecha</th>
              <th>Sala</th>
              <th>Asignación</th>
              <th>Titular</th>
              <th>Ayudante</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {reuniones.filter(filtrarReuniones).map((reunion, index) => {
              const key = `${reunion.Fecha}-${reunion.Titular}`;
              const isRepetido = repetidos[key] && repetidos[key].count > 1;
              return (
                <tr key={index} className={isRepetido ? 'table-danger' : ''}>
                  <td>{reunion.Fecha}</td>
                  <td>{reunion.Sala}</td>
                  <td>{reunion.Asignacion}</td>
                  <td>{reunion.Titular}</td>
                  <td>{reunion.Ayudante}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
          </tfoot>
        </table>
      </div>
      </div>
  );
};

export default MeetingHistory;



