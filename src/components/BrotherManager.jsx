import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';  

const BrotherManager = ({ onBrotherCreated }) => {
    const [formData, setFormData] = useState({
        nombre_hermano: '',
        apellido_hermano: '',
        genero: '',
        activo: false,
        comentarios: '',
        responsabilidades: [],
        asignaciones: []
    });

    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFormData({ ...formData, [name]: checked });
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleResponsabilidadChange = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setFormData({ ...formData, responsabilidades: [...formData.responsabilidades, value] });
        } else {
            setFormData({ ...formData, responsabilidades: formData.responsabilidades.filter(resp => resp !== value) });
        }
    };

    const handleAsignacionChange = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setFormData({ ...formData, asignaciones: [...formData.asignaciones, value] });
        } else {
            setFormData({ ...formData, asignaciones: formData.asignaciones.filter(asign => asign !== value) });
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.post('http://localhost:5000/hermanos', formData);
          setFormData({
              nombre_hermano: '',
              apellido_hermano: '',
              genero: '',
              activo: false,
              comentarios: '',
              responsabilidades: [],
              asignaciones: []
          });
          // Desactivar todos los checkboxes
          const checkboxes = document.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach(checkbox => checkbox.checked = false);
          toast.success('¡Participante creado correctamente!👤');
          onBrotherCreated(); 
      } catch (error) {
        console.error('Error al guardar el participante:', error);
        toast.error('Hubo un error al crear el participante. Por favor, inténtelo de nuevo.');
      }
  };

  return (

    <>
    <h2 className='my-4 text-center fw-bold'>Añadir Participante</h2>
    <div className='container mb-4 d-flex justify-content-center'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label fw-bold">Nombre: </label>
          <input type="text" className="form-control" id="nombre" name="nombre_hermano" value={formData.nombre_hermano} onChange={handleInputChange} style={{ width: '400px' }}/>
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label fw-bold">Apellido: </label>
          <input type="text" className="form-control" id="apellido" name="apellido_hermano" value={formData.apellido_hermano} onChange={handleInputChange} style={{ width: '400px' }}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input fw-bold" id="activo" name="activo" checked={formData.activo} onChange={handleCheckboxChange} />
          <label className="form-check-label" htmlFor="activo">Activo</label>
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label fw-bold">Género: </label>
          <select className="form-select" id="genero" name="genero" value={formData.genero} onChange={handleInputChange} style={{ width: '400px' }}>
            <option value="">Seleccionar género</option>
            <option value="m">Masculino</option>
            <option value="f">Femenino</option>
          </select>
        </div>
        <div>
        <label htmlFor="responsabilidad" className="form-label fw-bold">Responsabilidades: </label>
        <div>
        
          <div className="form-check form-switch">
            <input className="form-check-input" 
            type="checkbox" 
            value="Anciano" 
            onChange={handleResponsabilidadChange} />
            <label className="form-check-label">Anciano</label>
          </div>

          <div className="form-check form-switch">
            <input className="form-check-input" 
            type="checkbox" 
            value="Siervo Ministerial" 
            onChange={handleResponsabilidadChange}/>
            <label className="form-check-label">Siervo Ministerial</label>
          </div>

          <div className="form-check form-switch">
            <input className="form-check-input" 
            type="checkbox" 
            value="Precursor" 
            onChange={handleResponsabilidadChange}/>
            <label className="form-check-label">Precursor</label>
          </div>

          <div className="form-check form-switch">
            <input className="form-check-input" 
            type="checkbox" 
            value="Publicador Bautizado" 
            onChange={handleResponsabilidadChange}/>
            <label className="form-check-label">Publicador Bautizado</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" 
            type="checkbox" 
            value="Publicador no Bautizado" 
            onChange={handleResponsabilidadChange}/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Publicador no Bautizado</label>
          </div>
        </div>
        </div>

        <div>
        <label htmlFor="asignacion" className="form-label fw-bold mt-3">Asignaciones: </label>
          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Presidencia" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Presidencia</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Oración" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Oración</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Tesoros de la Biblia" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Tesoros de la Biblia</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Perlas Escondidas" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Perlas Escondidas</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Lectura de la Biblia" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Lectura de la Biblia</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Empiece Conversaciones" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Empiece Conversaciones</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Haga Revisitas" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Haga Revisitas</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Haga Discípulos" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Haga Discípulos</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Explique Creencias" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Explique Creencias</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Amo/a de casa" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Amo/a de casa</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Discurso" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Discurso</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Análisis Seamos Mejores Maestros" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Análisis Seamos Mejores Maestros</label>
          </div>


          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Nuestra Vida Cristiana" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Nuestra Vida Cristiana</label>
          </div>


          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Estudio Bíblico de congregación" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Estudio Bíblico de Congregación</label>
          </div>


          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Lectura libro" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Lectura Libro</label>
          </div>


          <div className="form-check">
            <input className="form-check-input" 
            type="checkbox" 
            value="Necesidades de la congregación" 
            onChange={handleAsignacionChange} />
            <label className="form-check-label">Necesidades de la Congregación</label>
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="comentarios" className="form-label fw-bold">Comentarios:</label>
          <textarea className="form-control" id="comentarios" name="Comentarios" value={formData.Comentarios} onChange={handleInputChange} style={{ width: '400px' }}/>
        </div>
        <div className='container mb-4 d-flex justify-content-center'>
        <button type="submit" className="btn btn-outline-primary">Crear Hermano</button>
        </div>
      </form>
    </div>
    </>
    
  );
};

BrotherManager.propTypes = {
  onBrotherCreated: PropTypes.func,
};

export default BrotherManager;








