import PropTypes from 'prop-types';

const ParticipantSelect = ({ participants, value, onChange }) => {
    return (
        <select 
            className="form-select form-select-sm" 
            aria-label=".form-select-sm example" 
            value={value}
            onChange={onChange}
        >
            <option value="">Seleccionar participante</option>
            {participants.map(hermano => (
                <option key={hermano.idHermano} value={hermano.idHermano}>
                    {hermano.Nombre_hermano} {hermano.Apellido_hermano}
                </option>
            ))}
        </select>
    );
};

ParticipantSelect.propTypes = {
    participants: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ParticipantSelect;
