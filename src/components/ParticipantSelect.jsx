/* import PropTypes from 'prop-types';

const ParticipantSelect = ({ participants, selected, onChange }) => {
  return (
    <select
      className='form-select'
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value=''>Seleccione Participante</option>
      {participants.map((participant) => (
        <option
          key={participant.idHermano}
          value={`${participant.Nombre_hermano} ${participant.Apellido_hermano}`}
        >
          {`${participant.Nombre_hermano} ${participant.Apellido_hermano}`}
        </option>
      ))}
    </select>
  );
};

ParticipantSelect.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      idHermano: PropTypes.number.isRequired,
      Nombre_hermano: PropTypes.string.isRequired,
      Apellido_hermano: PropTypes.string.isRequired
    })
  ).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

ParticipantSelect.defaultProps = {
  selected: ''
};

export default ParticipantSelect; */

import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const ParticipantSelect = ({ participants, selected, onChange }) => {
  const [appearances, setAppearances] = useState([]);

  const fetchAppearances = async (name) => {
    try {
      const response = await axios.get(`http://localhost:5000/hermano_apariciones/${encodeURIComponent(name)}`);
      setAppearances(response.data);
    } catch (error) {
      console.error('Error fetching appearances:', error);
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    onChange(value);
    if (value) {
      const [nombre, apellido] = value.split(' ');
      fetchAppearances(`${nombre} ${apellido}`);
    } else {
      setAppearances([]);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Últimas 5 Asignaciones</Popover.Header>
      <Popover.Body>
        {appearances.length === 0 ? (
          <p>No hay asignaciones recientes</p>
        ) : (
          <ul>
            {appearances.map((appearance, index) => (
              <li key={index}>
                <strong>Fecha:</strong> {appearance.fecha}, <strong>Asignación:</strong> {appearance.asignacion}, <strong>Sala:</strong> {appearance.sala}, <strong>Titular:</strong> {appearance.titular}, <strong>Ayudante:</strong> {appearance.ayudante}
              </li>
            ))}
          </ul>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
      <select
        className='form-select'
        value={selected}
        onChange={handleSelectChange}
      >
        <option value="">Seleccione Participante</option>
        {participants.map((participant) => (
          <option
            key={participant.id_hermano}
            value={`${participant.nombre_hermano} ${participant.apellido_hermano}`}
          >
            {`${participant.nombre_hermano} ${participant.apellido_hermano}`}
          </option>
        ))}
      </select>
    </OverlayTrigger>
  );
};

ParticipantSelect.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id_hermano: PropTypes.number.isRequired,
      nombre_hermano: PropTypes.string.isRequired,
      apellido_hermano: PropTypes.string.isRequired
    })
  ).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

ParticipantSelect.defaultProps = {
  selected: ''
};

export default ParticipantSelect;

