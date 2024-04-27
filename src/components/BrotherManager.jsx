import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BrotherManager = () => {
    const [formData, setFormData] = useState({
        Nombre_hermano: '',
        Apellido_hermano: '',
        Genero: '',
        Activo: false,
        Comentarios: '',
        Responsabilidades: [],
        Asignaciones: []
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
            setFormData({ ...formData, Responsabilidades: [...formData.Responsabilidades, value] });
        } else {
            setFormData({ ...formData, Responsabilidades: formData.Responsabilidades.filter(resp => resp !== value) });
        }
    };

    const handleAsignacionChange = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setFormData({ ...formData, Asignaciones: [...formData.Asignaciones, value] });
        } else {
            setFormData({ ...formData, Asignaciones: formData.Asignaciones.filter(asign => asign !== value) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/hermanos', formData);
            setFormData({
                Nombre_hermano: '',
                Apellido_hermano: '',
                Genero: '',
                Activo: false,
                Comentarios: '',
                Responsabilidades: [],
                Asignaciones: []
            });
            toast.success('¡Hermano creado correctamente!');
        } catch (error) {
          console.error('Error al guardar el hermano:', error);
          toast.error('Hubo un error al crear el hermano. Por favor, inténtelo de nuevo.');
        }
    };

  return (

    <>
    <h2 className='my-4 text-center fw-bold'>Gestión de Hermanos</h2>
    <div className='container mb-4 d-flex justify-content-center'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label fw-bold">Nombre: </label>
          <input type="text" className="form-control" id="nombre" name="Nombre_hermano" value={formData.Nombre_hermano} onChange={handleInputChange} style={{ width: '400px' }}/>
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label fw-bold">Apellido: </label>
          <input type="text" className="form-control" id="apellido" name="Apellido_hermano" value={formData.Apellido_hermano} onChange={handleInputChange} style={{ width: '400px' }}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input fw-bold" id="activo" name="Activo" checked={formData.Activo} onChange={handleCheckboxChange} />
          <label className="form-check-label" htmlFor="activo">Activo</label>
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label fw-bold">Género: </label>
          <select className="form-select" id="genero" name="Genero" value={formData.Genero} onChange={handleInputChange} style={{ width: '400px' }}>
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

    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="colored"/>
    </>
    
  );
};

export default BrotherManager;








