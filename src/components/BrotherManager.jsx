import { useState, useEffect } from 'react';
import axios from 'axios';

const BrotherManager = () => {
  const [hermanos, setHermanos] = useState([]);
  const [formData, setFormData] = useState({
    idHermano: null,
    Nombre_hermano: '',
    Apellido_hermano: '',
    Genero: 'm',
    Activo: false,
    Comentarios: ''
  });

  useEffect(() => {
    fetchHermanos();
  }, []);

  const fetchHermanos = async () => {
    try {
      const response = await axios.get('/hermanos');
      setHermanos(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de hermanos:', error);
    }
  };

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
      if (formData.idHermano) {
        // Editar hermano
        await axios.put(`/hermanos/${formData.idHermano}`, formData);
      } else {
        // Crear hermano
        await axios.post('/hermanos', formData);
      }
      fetchHermanos();
      setFormData({
        idHermano: null,
        Nombre_hermano: '',
        Apellido_hermano: '',
        Genero: 'm',
        Activo: false,
        Comentarios: ''
      });
    } catch (error) {
      console.error('Error al guardar el hermano:', error);
    }
  };

  const handleEdit = (hermano) => {
    setFormData(hermano);
  };

  const handleDelete = async (idHermano) => {
    try {
      await axios.delete(`/hermanos/${idHermano}`);
      fetchHermanos();
    } catch (error) {
      console.error('Error al eliminar el hermano:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Hermanos</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="Nombre_hermano" value={formData.Nombre_hermano} onChange={handleInputChange} />
        </label>
        <label>
          Apellido:
          <input type="text" name="Apellido_hermano" value={formData.Apellido_hermano} onChange={handleInputChange} />
        </label>
        <label>
          Género:
          <select name="Genero" value={formData.Genero} onChange={handleInputChange}>
            <option value="m">Masculino</option>
            <option value="f">Femenino</option>
          </select>
        </label>
        <label>
          Activo:
          <input type="checkbox" name="Activo" checked={formData.Activo} onChange={handleCheckboxChange} />
        </label>
        <label>
          Comentarios:
          <textarea name="Comentarios" value={formData.Comentarios} onChange={handleInputChange} />
        </label>
        <button type="submit">{formData.idHermano ? 'Actualizar' : 'Crear'}</button>
      </form>
      <ul>
  {Array.isArray(hermanos) && hermanos.map((hermano) => (
    <li key={hermano.idHermano}>
      {hermano.Nombre_hermano} {hermano.Apellido_hermano}
      <button onClick={() => handleEdit(hermano)}>Editar</button>
      <button onClick={() => handleDelete(hermano.idHermano)}>Eliminar</button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default BrotherManager;  


