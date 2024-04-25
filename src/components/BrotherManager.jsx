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
    Comentarios: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/hermanos', formData); // Cambiar la URL si es diferente
      setFormData({
        Nombre_hermano: '',
        Apellido_hermano: '',
        Genero: '',
        Activo: false,
        Comentarios: ''
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
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="nombre" name="Nombre_hermano" value={formData.Nombre_hermano} onChange={handleInputChange} style={{ width: '400px' }}/>
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido:</label>
          <input type="text" className="form-control" id="apellido" name="Apellido_hermano" value={formData.Apellido_hermano} onChange={handleInputChange} style={{ width: '400px' }}/>
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">Género:</label>
          <select className="form-select" id="genero" name="Genero" value={formData.Genero} onChange={handleInputChange} style={{ width: '400px' }}>
            <option value="">Seleccionar género</option>
            <option value="m">Masculino</option>
            <option value="f">Femenino</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="activo" name="Activo" checked={formData.Activo} onChange={handleCheckboxChange} />
          <label className="form-check-label" htmlFor="activo">Activo</label>
        </div>
        <div className="mb-3">
          <label htmlFor="comentarios" className="form-label">Comentarios:</label>
          <textarea className="form-control" id="comentarios" name="Comentarios" value={formData.Comentarios} onChange={handleInputChange} style={{ width: '400px' }}/>
        </div>
        <div className='container mb-4 d-flex justify-content-center'>
        <button type="submit" className="btn btn-primary">Crear Hermano</button>
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









