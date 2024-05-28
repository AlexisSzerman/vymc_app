  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import ParticipantSelect from './ParticipantSelect';
  import { ToastContainer, toast } from 'react-toastify';
  
  const MeetingSchedule = () => {
    const [hermanos, setHermanos] = useState([]);
    const [rows, setRows] = useState([
      {
        fecha: '',
        sala: '',
        asignacion: '',
        titular: '',
        ayudante: '',
      },
    ]);
  
    const salas = ['A', 'B'];
    const asignaciones = [
      'Presidencia',
      'Oración',
      'Tesoros de la Biblia',
      'Perlas Escondidas',
      'Lectura de la Biblia',
      'Empiece Conversaciones',
      'Haga Revisitas',
      'Haga Discípulos',
      'Explique Creencias',
      'Amo/a de casa',
      'Discurso',
      'Análisis Seamos Mejores Maestros',
      'Nuestra Vida Cristiana',
      'Estudio Bíblico de congregación',
      'Lectura libro',
      'Necesidades de la congregación',
    ];
  
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


    const [selectedRow, setSelectedRow] = useState({}); // Agregar esta línea

const handleChange = (index, field, value) => {
      setSelectedRow({ ...selectedRow, [field]: value });
      rows[index][field] = value; // Añade esta línea
    };
  

  
    const addNewRow = () => {
      setRows([
        ...rows,
        {
          fecha: '',
          sala: '',
          asignacion: '',
          titular: '',
          ayudante: '',
        },
      ]);
    };
    const deleteRow = (index) => {
      const row = rows[index]; // Añade una variable para almacenar la fila seleccionada
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      row.splice(index, 1); // Añade esta línea
    };

    const saveMeetings = async () => {
      try {
        const response = await axios.post('http://localhost:5000/reuniones', {
          reuniones: rows,
        });
        toast.success('¡Reunión creada correctamente!');
        console.log(response.data);
      } catch (error) {
        console.error('Error al guardar las reuniones:', error);
        toast.error('Error al guardar las reuniones');
      }
    };
  
    return (
      <div className='container'>
      <h2 className='my-4 text-center fw-bold'>Crear programa de la reunión</h2>
        <table className='table table-bordered table-hover'>
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
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type='date'
                    className='form-control'
                    value={row.fecha}
                    onChange={(e) => handleChange(index, 'fecha', e.target.value)}
                  />
                </td>
                <td>
                  <select
                    value={row.sala}
                    className='form-select'
                    onChange={(e) => handleChange(index, 'sala', e.target.value)}
                  >
                    <option value=''>Seleccione Sala</option>
                    {salas.map((sala) => (
                      <option key={sala} value={sala}>
                        {sala}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={row.asignacion}
                    className='form-select'
                    onChange={(e) =>
                      handleChange(index, 'asignacion', e.target.value)
                    }
                  >
                    <option value=''>Seleccione Asignación</option>
                    {asignaciones.map((asignacion) => (
                      <option key={asignacion} value={asignacion}>
                        {asignacion}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <ParticipantSelect
                    participants={hermanos}
                    selected={row.titular}
                    onChange={(value) => handleChange(index, 'titular', value)}
                  />
                </td>
                <td>
                  <ParticipantSelect
                    participants={hermanos}
                    selected={row.ayudante}
                    onChange={(value) => handleChange(index, 'ayudante', value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='5' className='text-center'>
              <button className='btn btn-outline-primary m-2' onClick={addNewRow}>
                Añadir fila <i className='bi bi-plus-square-fill'></i>
              </button>
              <button 
                className='btn btn-outline-danger m-2' 
                onClick={() => deleteRow(selectedRow)}>
                Eliminar últ. fila<i className='bi bi-trash-fill'></i>
             </button>
              <button className='btn btn-outline-success' onClick={saveMeetings}>
                  Guardar Reunión <i className='bi bi-floppy-fill'></i>
                </button>
              </td>
            </tr>
          </tfoot>
        </table>

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
  
  export default MeetingSchedule;