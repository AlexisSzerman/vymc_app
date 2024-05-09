

function Welcome() {
  return (
    <>
      <div className="container text-center">
      <div>
        <img
          src="../src/assets/react.svg"
          alt=""
          className="mx-auto d-block m-3"
          style={{ width: "10rem" }}
        />
        <div className="d-flex gap-4 justify-content-center">
          <img src="src/assets/tesoros_ico.svg" alt="" style={{ width: '4rem' }}/>
          <img src="src/assets/smm_ico.svg" alt="" style={{ width: '4rem' }}/>
          <img src="src/assets/nvc_ico.svg" alt="" style={{ width: '4rem' }} />
        </div>
      </div>
      <h3 className="mt-3 fw-bold">Gestor de Vida y Ministerio Cristiano</h3>
{/*       <p className="fs-4">Aplicación ideada para poder llevar a cabo la tarea de Presidente de Vida y Ministerio Cristianos</p> */}
      </div>
    </>


  );
}

export default Welcome;

