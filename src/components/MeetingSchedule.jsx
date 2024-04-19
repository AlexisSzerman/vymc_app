const MeetingSchedule = () => {
    return (
      <>
      <h2 className='my-4 text-center fw-bold'>Programa de la reunión</h2>
      <div className="container">
        <h3 className="mb-4">Cong. Plaza de la Misericordia</h3>
        <h2 className="mb-4">Programa para la reunión de entre semana</h2>
  
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col" className="col-auto"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              
            </tr>
          </thead>
          <tbody>
          <tr>
              <td></td>
              <td></td>
              <td>19/04/2024</td>
              <td></td>
              <td>Presidente: </td>
              <td>Nombre del Hermano</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Salmo 23-28</td>
              <td></td>
              <td>Oración Inicial: </td>
              <td>Nombre del Hermano</td>
            </tr>
            <tr>
              <td>19:30hs</td>
              <td></td>
              <td></td>
              <td></td>
              <td>Canción de inicio</td>
              <td>Número de la Canción</td>
            </tr>
            <tr>
              <td>19:35hs</td>
              <td></td>
              <td>Palabras de introducción</td>
              <td>(1min.)</td>
              <td colSpan="2"></td>
            </tr>
            <tr>
                <td><img src="src/assets/tesoros_ico.svg" alt="" style={{ width: '2.5rem' }}/></td>
                <td colSpan="5"><h2 style={{ color: '#3B7D8B' }} className="text-start fw-bold">TESOROS DE LA BIBLIA</h2></td>
            </tr>
            <tr className="text-center fw-bold">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Sala Principal</td>
              <td>Sala Auxiliar</td>
            </tr>
            <tr>
              <td>19:40hs</td>
              <td className="text-center fw-bold" style={{ color: '#3B7D8B' }}>1</td>
              <td>Discurso</td>
              <td>(10mins)</td>
              <td className="text-center">Nombre del Hermano</td>
              <td></td>
            </tr>
            <tr>
              <td>19:50hs</td>
              <td className="text-center fw-bold" style={{ color: '#3B7D8B' }}>2</td>
              <td>Busquemos perlas escondidas</td>
              <td>(10mins)</td>
              <td className="text-center">Nombre del Hermano</td>
              <td></td>
            </tr>
            <tr>
              <td>20:00hs</td>
              <td className="text-center fw-bold" style={{ color: '#3B7D8B' }}>3</td>
              <td>Lectura de la Biblia</td>
              <td>(4mins)</td>
              <td className="text-center">Nombre del Hermano</td>
              <td className="text-center">Nombre del Hermano</td>
            </tr>
            <tr>
            <td><img src="src/assets/smm_ico.svg" alt="" style={{ width: '2.5rem' }}/></td>
              <td colSpan="5"><h2 style={{ color: '#D78D06' }} className="text-start fw-bold">SEAMOS MEJORES MAESTROS</h2></td>
            </tr>
            <tr>
              <td>20:05hs</td>
              <td className="text-center fw-bold" style={{ color: '#D78D06' }}>4</td>
              <td>Empiece Conversaciones</td>
              <td>(3mins)</td>
              <td className="text-center">Nombre del Hermano A</td>
              <td className="text-center">Nombre del Hermano B</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-center">Ayudante del Hermano A</td>
              <td className="text-center">Ayudante del Hermano B</td>
            </tr>
            <tr>
              <td>20:09hs</td>
              <td className="text-center fw-bold" style={{ color: '#D78D06' }}>5</td>
              <td>Haga Revisitas</td>
              <td>(5mins)</td>
              <td className="text-center">Nombre del Hermano A</td>
              <td className="text-center">Nombre del Hermano B</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-center">Ayudante del Hermano A</td>
              <td className="text-center">Ayudante del Hermano B</td>
            </tr>
            <tr>
              <td>20:12hs</td>
              <td className="text-center fw-bold" style={{ color: '#D78D06' }}>6</td>
              <td>Discurso</td>
              <td>(5mins)</td>
              <td className="text-center">Nombre del Hermano A</td>
              <td className="text-center">Nombre del Hermano B</td>
            </tr>
            <tr>
            <td><img src="src/assets/nvc_ico.svg" alt="" style={{ width: '2.5rem' }} /></td>
              <td colSpan="5"><h2 style={{ color: '#BF2E14' }} className="text-start fw-bold">NUESTRA VIDA CRISTIANA</h2></td>
            </tr>
            <tr>
              <td>20:17hs</td>
              <td className="text-center fw-bold" style={{ color: '#BF2E14' }}>7</td>
              <td>Analisis con el auditorio</td>
              <td>(5mins)</td>
              <td className="text-center">Nombre del Hermano</td>
              <td></td>
            </tr>
            <tr>
              <td>20:22hs</td>
              <td className="text-center fw-bold" style={{ color: '#BF2E14' }}>8</td>
              <td>Necesidades de la congregación</td>
              <td>(10mins)</td>
              <td className="text-center">Nombre del Hermano </td>
              <td></td>
            </tr>
            <tr>
              <td>20:27hs</td>
              <td className="text-center fw-bold" style={{ color: '#BF2E14' }}>9</td>
              <td>Estudio bíblico de la congregación</td>
              <td>(30mins)</td>
              <td className="text-center">Nombre del Hermano </td>
              <td></td>
            </tr>
            <tr>
              <td>20:57hs</td>
              <td></td>
              <td>Palabras de conclusión</td>
              <td>(3mins)</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>21:00hs</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-center">Canción de conclusión</td>
              <td className="text-center">Número de canción</td>
            </tr>
            <tr>
              <td>21:05hs</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-center">Oración de conclusión</td>
              <td className="text-center">Nombre del Hermano</td>
            </tr>
          </tbody>
        </table>
      </div>
      </>
    )
  }
  
  export default MeetingSchedule
  
  