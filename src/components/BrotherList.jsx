import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const BrotherList = () => {
  const [hermanos, setHermanos] = useState([]);
  const [selectedBrother, setSelectedBrother] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');

  useEffect(() => {
    fetchHermanos();
  }, []);

  const fetchHermanos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hermanos');
      setHermanos(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de hermanos:', error);
    }
  };

  const openModal = (hermano, action) => {
    setSelectedBrother(hermano);
    setShowModal(true);
    setAction(action);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const eliminarHermano = async (idHermano) => {
    try {
      await axios.delete(`http://localhost:5000/hermanos/${idHermano}`);
      fetchHermanos();
      setShowModal(false);
       toast.success(`¡${selectedBrother.Nombre_hermano} ${selectedBrother.Apellido_hermano} se ha eliminado exitosamente!`);
    } catch (error) {
      console.error('Error al eliminar el hermano:', error);
      toast.error('Hubo un error al eliminar el hermano. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className='container mb-4'>
    <h2 className='my-4 text-center fw-bold'>Listado de Hermanos</h2>
    <div className='container'>
      <table className="table table-hover">
        <thead>
          <tr className='text-center'>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Activo</th>
            <th>Comentarios</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {hermanos.map((hermano) => (
            <tr key={hermano.idHermano}>
              <td>{hermano.Nombre_hermano}</td>
              <td>{hermano.Apellido_hermano}</td>
              <td>{hermano.Activo ? 'Sí' : 'No'}</td>
              <td>{hermano.Comentarios}</td>
              <td><i className="bi bi-eye-fill" onClick={() => openModal(hermano, 'details')} style={{ cursor: 'pointer', color: 'purple'}}></i></td>
              <td><i className="bi bi-pencil-fill" style={{ cursor: 'pointer', color: 'purple'}}></i></td>
              <td><i className="bi bi-trash-fill" onClick={() => openModal(hermano, 'delete')} style={{ cursor: 'pointer', color: 'purple'}}></i></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* Modal de detalles y eliminación */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title" style={{color: 'purple'}}>{action === 'details' ? `Detalles de ${selectedBrother.Nombre_hermano} ${selectedBrother.Apellido_hermano}` : 'Confirmar Eliminación'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {action === 'details' && (
                  <div>
                    <p><strong>Responsabilidades: </strong>{selectedBrother.responsabilidades.join(', ')}</p>
                    <p><strong>Asignaciones habilitadas: </strong>{selectedBrother.asignaciones.join(', ')}</p>
                    <p><strong>Comentarios: </strong>{selectedBrother.Comentarios}</p>
                  </div>
                )}
                {action === 'delete' && (
                  <p>¿Está seguro de que deseas eliminar a <strong>{selectedBrother && `${selectedBrother.Nombre_hermano} ${selectedBrother.Apellido_hermano}`}</strong> de la lista?</p>

                )}
              </div>
              <div className="modal-footer">
                {action === 'details' && (
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                )}
                {action === 'delete' && (
                  <div>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                    <button type="button" className="btn btn-danger m-2" onClick={() => eliminarHermano(selectedBrother.idHermano)}>Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
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
    </div>
      
  );
};

export default BrotherList;
