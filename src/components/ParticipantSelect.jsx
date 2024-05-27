import PropTypes from 'prop-types';

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

export default ParticipantSelect;